import statusHandler from './status.js';
import analyzeHandler from './analyze.js';
import simulateHandler from './simulate.js';
import setKeyHandler from './set-key.js';
import { sendJson, handleCors } from './_utils.js';

export default async function handler(req: any, res: any) {
  if (handleCors(req, res)) return;

  const url = (req.url || '').split('?')[0];

  if (url.endsWith('/status')) {
    return statusHandler(req, res);
  }
  if (url.endsWith('/analyze')) {
    return analyzeHandler(req, res);
  }
  if (url.endsWith('/simulate')) {
    return simulateHandler(req, res);
  }
  if (url.endsWith('/set-key')) {
    return setKeyHandler(req, res);
  }

  return sendJson(res, 404, {
    error: 'API_ENDPOINT_NOT_FOUND',
    message: `The requested endpoint ${url} does not exist on LifeBridge AI API.`
  });
}
