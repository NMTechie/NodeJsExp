// Read the csv file and convert it to a JSON object
import fs from 'fs';
//import { parse } from 'csv-parse/sync';
import { join } from 'path';


async function listFiles(dir) {
  try {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    const arrAllFilePaths = [];

    for (const file of files) {
      const fullPath = join(dir, file.name);

      if (file.isDirectory()) {
        // Recursively list files in subdirectory
        await listFiles(fullPath);
      } else {        
        arrAllFilePaths.push(fullPath);
      }
    }
    return arrAllFilePaths;
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

async function readFileContent(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return content;
  } catch (err) {
    console.error('Error reading file:', err);  
    throw err; // Re-throw the error for further handling if needed
  }
}


export default {listFiles,readFileContent};