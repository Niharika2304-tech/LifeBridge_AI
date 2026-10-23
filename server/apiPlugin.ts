import type { Plugin } from 'vite';
import statusHandler from '../api/status.js';
import analyzeHandler from '../api/analyze.js';
import simulateHandler from '../api/simulate.js';
import setKeyHandler from '../api/set-key.js';
import { getResolvedApiKey } from '../api/_utils.js';

export { getResolvedApiKey };

export function lifebridgeApiPlugin(): Plugin {
  return {
    name: 'lifebridge-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/status') {
          return statusHandler(req, res);
        }

        if (url === '/api/set-key') {
          return setKeyHandler(req, res);
        }

        if (url === '/api/analyze') {
          return analyzeHandler(req, res);
        }

        if (url === '/api/simulate') {
          return simulateHandler(req, res);
        }

        next();
      });
    }
  };
}
