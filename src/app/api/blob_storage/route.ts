// app/api/blob_storage/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const blobStoragePath = process.env.BLOB_STORAGE_PATH ?? '';

export async function GET(req: NextRequest) {
    const filePath = req.nextUrl.searchParams.get('path');

    if (!filePath) {
        console.error("DEBUG: Missing file path in query");
        return NextResponse.json({ error: 'Missing file path' }, { status: 400 });
    }

    const fullPath = path.join(blobStoragePath, filePath);

    try {
        const file = await fs.readFile(fullPath);

        const ext = path.extname(filePath).slice(1); // Get extension without the dot
        const contentType = `image/${ext}`;

        return new NextResponse(file, {
            headers: { 'Content-Type': contentType },
        });
    } catch (error) {
        console.error("DEBUG: Error reading file:", error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}

