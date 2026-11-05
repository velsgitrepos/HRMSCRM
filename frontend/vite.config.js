import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Helper to extract dev server port from root config.json
function getDevPort() {
  const rootConfigPath = path.resolve(__dirname, '../config.json');
  if (fs.existsSync(rootConfigPath)) {
    try {
      const raw = fs.readFileSync(rootConfigPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed.frontendUrl) {
        const urlObj = new URL(parsed.frontendUrl);
        if (urlObj.port) {
          return parseInt(urlObj.port, 10);
        }
      }
    } catch (e) {
      console.warn('Could not parse dev port from root config.json:', e.message);
    }
  }
  return 5173;
}

const targetPort = getDevPort();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'root-config-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/config.json') {
            const rootConfigPath = path.resolve(__dirname, '../config.json');
            if (fs.existsSync(rootConfigPath)) {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
              return res.end(fs.readFileSync(rootConfigPath, 'utf8'));
            }
          }
          next();
        });
      },
      closeBundle() {
        try {
          const rootConfigPath = path.resolve(__dirname, '../config.json');
          const distConfigPath = path.resolve(__dirname, 'dist/config.json');
          if (fs.existsSync(rootConfigPath)) {
            fs.copyFileSync(rootConfigPath, distConfigPath);
            console.log('Successfully copied root config.json to dist/config.json');
          }
        } catch (err) {
          console.warn('Could not copy root config.json to dist:', err.message);
        }
      },
    },
  ],
  server: {
    port: targetPort,
    strictPort: false,
    fs: {
      allow: ['..'],
    },
  },
});
