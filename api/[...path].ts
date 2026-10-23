import statusHandler from './status';
import analyzeHandler from './analyze';
import simulateHandler from './simulate';
import setKeyHandler from './set-key';
import { sendJson, handleCors } from './_utils';

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
