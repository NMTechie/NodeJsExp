import os from 'os';

const flagActions = new Map();
flagActions.set('--help', () => {
  console.log('Usage: nodeCustomModule [options]');
  console.log('Options:');
  console.log('--help\t\tShow this help message');
  console.log('--version\tShow version information');
  console.log('--os\t\tShow operating system information');
});

flagActions.set('--version', () => {
  console.log('Version: 1.0.0');
});

flagActions.set('--os', () => {
  console.log(`Operating System: ${os.type()}`);
  console.log(`Platform: ${os.platform()}`);
  console.log(`Architecture: ${os.arch()}`);
  console.log(`Release: ${os.release()}`);
  console.log(`Total Memory: ${os.totalmem()} bytes`);
  console.log(`Free Memory: ${os.freemem()} bytes`);
});

export default flagActions;