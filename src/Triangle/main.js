import filehandlings from './filehandling.js';

const inputDirectoryPath = process.env.INPUTDIR;
const outputDirectoryPath = process.env.OUTPUTDIR;

console.log(`Input Directory: ${inputDirectoryPath}`);
console.log(`Output Directory: ${outputDirectoryPath}`);

const filespaths = await filehandlings.listFiles(inputDirectoryPath);
filespaths.forEach(eachFilePath => {
    console.log(`File Path: ${eachFilePath}`);
});

// const csvFilePath = join(__dirname, 'data.csv');
// const csvContent = readFileSync(csvFilePath, 'utf8');
// const records = parse(csvContent, {
//   columns: true,
//     skip_empty_lines: true,
//     trim: true
// });

