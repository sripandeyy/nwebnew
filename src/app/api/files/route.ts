import { NextResponse } from "next/server";
import * as ftp from "basic-ftp"; // ✅ Ensure correct import
import { Readable } from "stream";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = `/domains/nyeras.com/public_html/${file.name}`; // Use actual file name

        // ✅ Ensure FTP client is properly instantiated
        const client = new ftp.Client();
        client.ftp.verbose = true;

        await client.access({
            host: process.env.FTP_HOST || "localhost",
            user: process.env.FTP_USER || "",
            password: process.env.FTP_PASSWORD || "",
            port: parseInt(process.env.FTP_PORT || "21", 10),
        });

        // Convert Buffer to Readable Stream
        const readableStream = Readable.from(buffer);

        // Upload file
        await client.uploadFrom(readableStream, filePath);

        client.close();
        return NextResponse.json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
        console.error("FTP Upload Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
