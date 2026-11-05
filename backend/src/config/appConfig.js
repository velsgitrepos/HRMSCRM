const path = require('path');
const fs = require('fs');

let config = {
  frontendUrl: 'http://localhost:5173',
  backendUrl: 'http://localhost:5005',
};

const candidatePaths = [
  path.join(__dirname, '../../../config.json'),
  path.join(__dirname, '../../config.json'),
  path.join(process.cwd(), 'config.json'),
  path.join(process.cwd(), '../config.json'),
  path.join(process.cwd(), 'frontend/public/config.json'),
];

for (const configPath of candidatePaths) {
  try {
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf8');
      const parsed = JSON.parse(rawData);
      if (parsed.frontendUrl) config.frontendUrl = parsed.frontendUrl.replace(/\/+$/, '');
      if (parsed.backendUrl) config.backendUrl = parsed.backendUrl.replace(/\/+$/, '');
      break;
    }
  } catch (err) {
    console.warn(`Could not parse config.json at ${configPath}:`, err.message);
  }
}

// Extract PORT number from backendUrl
let portFromUrl = 5005;
try {
  const parsed = new URL(config.backendUrl);
  if (parsed.port) {
    portFromUrl = parseInt(parsed.port, 10);
  }
} catch (e) {
  // Use default
}

const finalPort = portFromUrl || process.env.PORT || 5005;
const finalFrontendUrl = process.env.FRONTEND_URL || config.frontendUrl;
const finalBackendUrl = process.env.BACKEND_URL || config.backendUrl;

module.exports = {
  FRONTEND_URL: finalFrontendUrl,
  BACKEND_URL: finalBackendUrl,
  PORT: finalPort,
};
