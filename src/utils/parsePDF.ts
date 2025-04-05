// Utility func to parse through pdfs

import fs from 'fs';
import pdfParse from "pdf-parse";

export const extractText = async (filePath: string): Promise<string> => {
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdfParse(dataBuffer); 
        return data.text;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to parse PDF: ${errorMessage}`);
    }
};