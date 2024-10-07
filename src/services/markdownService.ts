import { promises as fs } from 'fs';
import * as path from 'path';

class MarkdownService {
    private filePath: string;

    constructor(filename: string) {
        const dir = __dirname.replace('src\\services', 'data');
        console.log(dir);
        this.filePath = path.join(dir, filename);
    }

    // Method to write content to a markdown file
    async writeToFile(content: string): Promise<void> {
        try {
            await fs.writeFile(this.filePath, content, 'utf8');
            console.log(`File written successfully to ${this.filePath}`);
        } catch (error: unknown) {  // Explicitly typing error as unknown
            if (error instanceof Error) {
                console.error(`Error writing to file: ${error.message}`);
            } else {
                console.error('Unknown error occurred while writing to file.');
            }
        }
    }

    // Method to read content from a markdown file
    async readFromFile(): Promise<string> {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            console.log(`File read successfully from ${this.filePath}`);
            return data;
        } catch (error: unknown) {  // Explicitly typing error as unknown
            if (error instanceof Error) {
                console.error(`Error reading file: ${error.message}`);
            } else {
                console.error('Unknown error occurred while reading file.');
            }
            return '';
        }
    }
}

export default MarkdownService;