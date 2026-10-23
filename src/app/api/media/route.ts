import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * POST /api/media
 * Uploads media assets strictly to Vercel Blob.
 * Never stores files on local disk.
 * Returns a clear descriptive error if BLOB_READ_WRITE_TOKEN is not configured.
 */
export async function POST(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN is not configured. Please set BLOB_READ_WRITE_TOKEN in your environment variables.',
      },
      { status: 500 }
    );
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let buffer: Buffer;
    let filename = `upload-${Date.now()}`;
    let mimeType = 'application/octet-stream';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');

      if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: 'No file provided in form-data' }, { status: 400 });
      }

      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'File exceeds 5MB size limit' }, { status: 413 });
      }

      mimeType = file.type || mimeType;
      filename = file.name || filename;
      buffer = Buffer.from(await file.arrayBuffer());
    } else {
      // JSON body with dataUrl
      const body = await req.json().catch(() => null);
      if (!body || typeof body.dataUrl !== 'string') {
        return NextResponse.json({ error: 'Expected multipart file or JSON with dataUrl' }, { status: 400 });
      }

      const match = body.dataUrl.match(/^data:([a-z/+-]+);base64,(.+)$/i);
      if (!match) {
        return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 });
      }

      mimeType = match[1].toLowerCase();
      buffer = Buffer.from(match[2], 'base64');

      if (body.filename && typeof body.filename === 'string') {
        filename = body.filename;
      } else {
        const ext = mimeType.split('/')[1] || 'bin';
        filename = `upload-${Date.now()}.${ext}`;
      }

      if (buffer.length > MAX_BYTES) {
        return NextResponse.json({ error: 'Payload exceeds 5MB size limit' }, { status: 413 });
      }
    }

    if (ALLOWED_TYPES.length > 0 && !ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: `File type "${mimeType}" is not supported. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Upload directly to Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      token,
      contentType: mimeType,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error) {
    console.error('[Upload/Blob] Upload to Vercel Blob failed:', error);
    const msg = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
