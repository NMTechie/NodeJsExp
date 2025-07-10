/*
console.log(process.argv);
console.log(`The defult arg list is: ${process.argv}`);
console.log(`Printing value from env file: ${process.env.USER} and Surname is ${process.env.TEST}`);

// Hooking into process life cycle events
process.on('exit', (code) => {
    console.log(`Process is exiting with code: ${code} and ran for ${process.uptime()} seconds`);
});
process.on('beforeExit', (code) => {
    console.log(`BeforeExit - Process is about to exit with code: ${code}`);
});
process.on('uncaughtException', (err) => {
    console.error(`There was an uncaught error: ${err}`);
    // process.exit(1); // Uncomment to exit the process after handling the error
});
*/

// exporting custom modules
//import flagActions from './nodeCustomModule.js'; // execution strats from here (staic import of modules)

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('No arguments provided. Use --help for usage information.');
}   
else 
{
    if(args.includes('--os'))
    {
        // Importing the custom module dynamically
        // This allows us to load the module only when needed, which can be useful for performance  
        const {default: flagActions} = await import('./nodeCustomModule.js'); // dynamic import of modules and this will not start execution from here rather from top.

        console.log(flagActions);

        args.forEach(arg => {
                if (flagActions.has(arg)) 
                {
                flagActions.get(arg)();
                }
            });
    }
    else
    {
        console.log(`Unknown argument: ${args}. Use --help for usage information.`);
    }
}