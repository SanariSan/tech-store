import type { Express, NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { ELOG_LEVEL } from '../../general.type';
import { publishLog } from '../../modules/access-layer/events/pubsub';
import { NotFoundError } from '../../server/error';
import type { TApiBranches } from '../../server/routers';
import * as apiBranches from '../../server/routers';

function setupRoutersExpress(app: Express) {
  const { API_VERSION } = process.env;

  // console.dir(apiBranches, { depth: 10 }); // => { v1: [Getter], v2: [Getter] }
  app.use(`/api/${API_VERSION}`, (apiBranches as unknown as TApiBranches)[API_VERSION]);

  // general fallback when no static content is served
  app.use(`*`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });

  // serve static content | moved to nginx
  // if (NODE_ENV === 'production') {
  //   app.use(express.static(path.resolve(BUILD_PATH)));
  //   app.get('*', (req, res) => {
  //     console.log('this');
  //     res.sendFile(path.resolve(BUILD_PATH, 'index.html'));
  //   });
  // }
}

export { setupRoutersExpress };
