import fs from 'fs';
import readline from 'readline';
import stringOperations from '../Helper/stringOperations.js';
import businessLogics from './businessLogics.js';

async function readCsvLineByLine(filePath) {
    let lineidex = 0;
    let productColIndex = -1;
    let oryrColIndex = -1;
    let devyrColIndex = -1;
    let incrValColIndex = -1;

    let yearInfo = {
        minOriginYear: -1,
        maxDevYear: -1
    };

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Each line in the CSV file will be here as a string
        if (lineidex === 0) {
            //console.log(`Header: ${line}`); // Print the header line
            const headers = line.split(',');
            headers.forEach((header, index) => {
                if (stringOperations.compareStrings(header, process.env.PRODUCTCOLHEADER)) {
                    productColIndex = index;
                } else if (stringOperations.compareStrings(header, process.env.ORIGINYEARCOLHEADER)) {
                    oryrColIndex = index;
                } else if (stringOperations.compareStrings(header, process.env.DEVYEARCOLHEADER)) {
                    devyrColIndex = index;
                } else if (stringOperations.compareStrings(header, process.env.INCREVALUECOLHEADER)) {
                    incrValColIndex = index;
                }
            });
        }
        else {
            const lineInfo = line.split(',');
            console.log(`Product is : ${lineInfo[productColIndex]}, Original Year: ${lineInfo[oryrColIndex]}, Development Year: ${lineInfo[devyrColIndex]}, Increment Value: ${lineInfo[incrValColIndex]}`); // Process each line of the CSV file
            yearInfo = businessLogics.getMinOriginMaxDevYear(
                parseInt(lineInfo[oryrColIndex], 10),
                parseInt(lineInfo[devyrColIndex], 10),
                yearInfo
            );

        }
        lineidex++;
    }
    rl.close();
    console.log(`Minimum Origin Year: ${yearInfo.minOriginYear}, Maximum Development Year: ${yearInfo.maxDevYear}`);
}

async function convertIntoJson(line) {
    const [id, name, age] = line.split(',');
    return {
        id: parseInt(id, 10),
        name: name.trim(),
        age: parseInt(age, 10)
    };
}

export default { readCsvLineByLine, convertIntoJson };
