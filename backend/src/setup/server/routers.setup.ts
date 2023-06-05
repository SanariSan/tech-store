import express from 'express';
import type { Express } from 'express';
import path from 'path';
import { NotFoundError } from '../../server/error';
import type { TApiBranches } from '../../server/routers';
import * as apiBranches from '../../server/routers';

function setupRoutersExpress(app: Express) {
  const { API_VERSION, NODE_ENV, BUILD_PATH } = process.env;

  // console.dir(apiBranches, { depth: 10 }); // => { v1: [Getter], v2: [Getter] }
  app.use(`/api/${API_VERSION}`, (apiBranches as unknown as TApiBranches)[API_VERSION]);

  // serve static content | moved to nginx
  if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(BUILD_PATH)));
    app.get('*', (req, res) => {
      console.log('static');
      res.sendFile(path.resolve(BUILD_PATH, 'index.html'));
    });
  }

  // general fallback when no static content is served
  app.use(`*`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });
}

export { setupRoutersExpress };
