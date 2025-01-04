// app/lib/helpers/fileStorage.ts

import path from "path";
import fs from "fs/promises";

const blobStoragePath = process.env.BLOB_STORAGE_PATH ?? "";

export async function saveFileToDisk(file: File, fileName: string): Promise<string> {
    const filePath = path.join(blobStoragePath, fileName);
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        return filePath;
    } catch (error) {
        console.error("Error saving file to disk:", error);
        throw new Error("Failed to save file");
    }
}
