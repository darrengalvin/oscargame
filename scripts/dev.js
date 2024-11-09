const detectPort = require('detect-port-alt');
const { spawn } = require('child_process');

const BASE_PORT = 3435;
const MAX_PORT = 3500;

async function findAvailablePort(startPort) {
  try {
    const port = await detectPort(startPort);
    if (port !== startPort) {
      if (port <= MAX_PORT) {
        return port;
      }
      return findAvailablePort(port + 1);
    }
    return startPort;
  } catch (err) {
    if (startPort < MAX_PORT) {
      return findAvailablePort(startPort + 1);
    }
    throw new Error('No available ports found');
  }
}

async function startDev() {
  try {
    const port = await findAvailablePort(BASE_PORT);
    console.log(`Starting development server on port ${port}`);
    
    const nextDev = spawn('next', ['dev', '--port', port.toString()], {
      stdio: 'inherit',
      shell: true
    });

    nextDev.on('error', (err) => {
      console.error('Failed to start development server:', err);
      process.exit(1);
    });

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

startDev(); 