import filehandlings from './filehandling.js';

const inputDirectoryPath = process.env.INPUTDIR;
const outputDirectoryPath = process.env.OUTPUTDIR;

console.log(`Input Directory: ${inputDirectoryPath}`);
console.log(`Output Directory: ${outputDirectoryPath}`);

//get all files in the input directory
const filespaths = await filehandlings.listFiles(inputDirectoryPath);




// Read the content of each file
const readFileContentsPromises = [];
filespaths.forEach(eachFilePath => {
    console.log(`File Path: ${eachFilePath}`);
    readFileContentsPromises.push(filehandlings.readFileContent(eachFilePath));

});
const fileContents = await Promise.allSettled(readFileContentsPromises);

fileContents.forEach((result, index) => {
    if (result.status === 'fulfilled') {
        console.log(`File ${index + 1} content:`, result.value);
    }
    else {
        console.error(`File ${index + 1} failed to read:`, result.reason);
    }
});

// const csvFilePath = join(__dirname, 'data.csv');
// const csvContent = readFileSync(csvFilePath, 'utf8');
// const records = parse(csvContent, {
//   columns: true,
//     skip_empty_lines: true,
//     trim: true
// });

