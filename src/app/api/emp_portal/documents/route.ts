import { NextResponse } from "next/server";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import { getDb } from '../../db';

// Helper: read a File from FormData and upload to FTP; returns the final FTP path or URL
async function uploadToFtp(file: File, client: ftp.Client, folderPath = "/domains/nyeras.com/emp_documents") {
  const timeStamp = Date.now();
  const originalName = file.name.replace(/\s+/g, "_"); // remove spaces
  const ftpFileName = `${timeStamp}_${originalName}`;
  const remoteFilePath = `${folderPath}/${ftpFileName}`;

  // Convert File -> Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert Buffer to a Readable stream
  const readableStream = Readable.from(buffer);

  // Upload to FTP
  await client.uploadFrom(readableStream, remoteFilePath);

  // Optionally return an absolute URL or a relative path
  // (If you have a domain pointing to /public_html, you can do something like this)
  const publicUrl = `https://www.nyeras.com/${ftpFileName}`;
  return publicUrl;
}

export async function POST(req: Request) {
  let client: ftp.Client | null = null;

  try {
    // 1) Parse the incoming form data
    const formData = await req.formData();

    // -------- TEXT FIELDS ----------
    const firstName = formData.get("firstName")?.toString() || "";
    const middleName = formData.get("middleName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const aadharName = formData.get("aadharName")?.toString() || "";
    const aadharNumber = formData.get("aadharNumber")?.toString() || "";
    const panNumber = formData.get("panNumber")?.toString() || "";
    const degree = formData.get("degree")?.toString() || "";
    const studyMode = formData.get("studyMode")?.toString() || "";
    const collegeName = formData.get("collegeName")?.toString() || "";
    const degreeLevel = formData.get("degreeLevel")?.toString() || "";
    const grade = formData.get("grade")?.toString() || "";
    const accountNumber = formData.get("accountNumber")?.toString() || "";
    const ifscCode = formData.get("ifscCode")?.toString() || "";
    const bankName = formData.get("bankName")?.toString() || "";

    // -------- FILE FIELDS ----------
    const profilePhotoFile = formData.get("profilePhoto");
    const aadharFrontFile = formData.get("aadharFront");
    const aadharBackFile = formData.get("aadharBack");
    const panFrontFile = formData.get("panFront");
    const passbookOrChequeFile = formData.get("passbookOrCheque");

    // Note: `educationDocuments` might be multiple files
    const educationDocs = formData.getAll("educationDocuments") as File[];

    // 2) Initialize and connect the FTP client once
    client = new ftp.Client();
    client.ftp.verbose = true;
    await client.access({
      host: process.env.FTP_HOST || "localhost",
      user: process.env.FTP_USER || "",
      password: process.env.FTP_PASSWORD || "",
      port: parseInt(process.env.FTP_PORT || "21", 10),
    });

    // 3) Upload each file you actually received, and store its URL.
    let profilePhotoUrl = "";
    if (profilePhotoFile instanceof File && profilePhotoFile.size > 0) {
      profilePhotoUrl = await uploadToFtp(profilePhotoFile, client);
    }

    let aadharFrontUrl = "";
    if (aadharFrontFile instanceof File && aadharFrontFile.size > 0) {
      aadharFrontUrl = await uploadToFtp(aadharFrontFile, client);
    }

    let aadharBackUrl = "";
    if (aadharBackFile instanceof File && aadharBackFile.size > 0) {
      aadharBackUrl = await uploadToFtp(aadharBackFile, client);
    }

    let panFrontUrl = "";
    if (panFrontFile instanceof File && panFrontFile.size > 0) {
      panFrontUrl = await uploadToFtp(panFrontFile, client);
    }

    let passbookOrChequeUrl = "";
    if (passbookOrChequeFile instanceof File && passbookOrChequeFile.size > 0) {
      passbookOrChequeUrl = await uploadToFtp(passbookOrChequeFile, client);
    }

    // Education documents can be multiple. We’ll store them in an array of URLs.
    const educationDocsUrls: string[] = [];
    for (const doc of educationDocs) {
      if (doc instanceof File && doc.size > 0) {
        const docUrl = await uploadToFtp(doc, client);
        educationDocsUrls.push(docUrl);
      }
    }

    client.close();
    const connection = getDb();
    const sql = `
      INSERT INTO employee_details
        (firstName, middleName, lastName, aadharName, aadharNumber, panNumber, 
         profilePhotoUrl, aadharFrontUrl, aadharBackUrl, panFrontUrl, 
         degree, studyMode, collegeName, degreeLevel, grade, educationDocumentsUrls,
         accountNumber, ifscCode, bankName, passbookOrChequeUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      firstName,
      middleName,
      lastName,
      aadharName,
      aadharNumber,
      panNumber,
      profilePhotoUrl,
      aadharFrontUrl,
      aadharBackUrl,
      panFrontUrl,
      degree,
      studyMode,
      collegeName,
      degreeLevel,
      grade,
      // Store multiple education doc URLs as JSON text or a separate table:
      JSON.stringify(educationDocsUrls),
      accountNumber,
      ifscCode,
      bankName,
      passbookOrChequeUrl,
    ];

    await connection.execute(sql, params);
    // connection returned to pool

    // 6) Return success
    return NextResponse.json({
      success: true,
      message: "Form data and file(s) uploaded successfully",
      data: {
        firstName,
        lastName,
        // ...
        // Return URLs if you’d like
        profilePhotoUrl,
        aadharFrontUrl,
        // ...
        educationDocsUrls,
      },
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    if (client) client.close();

    return NextResponse.json(
      { error: (error instanceof Error && error.message) || "Internal Server Error" },
      { status: 500 }
    );
  }
}