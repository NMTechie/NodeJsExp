import filehandlings from './filehandling.js';
import menuBuilder from './Helper/MeuBuilder.js';

const inputDirectoryPath = process.env.INPUTDIR;
const outputDirectoryPath = process.env.OUTPUTDIR;

console.log(`Input Directory: ${inputDirectoryPath}`);
console.log(`Output Directory: ${outputDirectoryPath}`);


try {
    //get all files in the input directory
    const filespaths = await filehandlings.listFiles(inputDirectoryPath);
    const selectedFile = await menuBuilder.menuBuilder(filespaths);
    const fileContent = await filehandlings.readFileContent(selectedFile);
    console.log(`Content of the selected file (${selectedFile}):\n`, fileContent);

} catch (error) {
    console.error("Error occured for reason:", error.message);
    process.exit(1);

}

/**********The below code is gives a kind of parallel reading of files though it not equal to Parallel for each in C#******** */
// Read the content of each file
// const readFileContentsPromises = [];
// filespaths.forEach(eachFilePath => {
//     console.log(`File Path: ${eachFilePath}`);
//     readFileContentsPromises.push(filehandlings.readFileContent(eachFilePath));

// });
// const fileContents = await Promise.allSettled(readFileContentsPromises);

// fileContents.forEach((result, index) => {
//     if (result.status === 'fulfilled') {
//         console.log(`File ${index + 1} content:`, result.value);
//     }
//     else {
//         console.error(`File ${index + 1} failed to read:`, result.reason);
//     }
// });



