import connectRedis from 'connect-redis';
import cors from 'cors';
import type { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { CacheDBConnectionManager } from '../../db';
import { publishLog } from '../../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../general.type';

function setupSettingsExpress(app: Express) {
  const { CORS_URL, NODE_ENV, COOKIE_SECRET } = process.env;

  const RedisStore = connectRedis(session);
  const redisClient = CacheDBConnectionManager.getInstance().getConnection();

  app.use((req, res, next) => {
    console.log(JSON.stringify(req.headers));
    next();
  });
  // origin: true for mirroring Front 'Origin' header back
  // origin: CORS_URL for static env url
  // origin: process.env.NODE_ENV === 'production' ? process.env.CORS_URL : true,
  app.set('env', NODE_ENV);
  // app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  // todo: maybe switch 0/1 dev/prod?
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 204,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          connectSrc: ['*'],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "'unsafe-inline'", 'data:', 'blob:'],
        },
      },
      // allow requests from any origin (e.g. dev front on localhost -> back on host)
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('x-powered-by', false);

  let domain: string = CORS_URL;

  // cut http-s prefix
  if (/^https?:\/+/.test(CORS_URL)) {
    domain = CORS_URL.slice(CORS_URL.lastIndexOf('/') + 1);
  }

  // cut subdomain
  if (/^\w+\.\w+\.\w+$/.test(domain)) {
    domain = domain.slice(domain.indexOf('.') + 1);
  }

  publishLog(ELOG_LEVEL.DEBUG, domain);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: COOKIE_SECRET,
      name: 'sid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: NODE_ENV === 'production',
        // sameSite: NODE_ENV === 'production' ? 'lax' : 'none',
        sameSite: NODE_ENV === 'production' ? 'lax' : 'none',
        domain,
      },
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    const xRealIp = req.headers['x-real-ip'];
    const xForwardedFor = req.headers['x-forwarded-for'];
    let ip: string;

    if (xRealIp !== undefined) {
      ip = `${xRealIp.toString()}`;
    } else if (xForwardedFor !== undefined) {
      [ip] = `${xForwardedFor.toString()}`.split(',');
    } else {
      ip = `${req.socket.remoteAddress ?? ''}`;
    }

    publishLog(ELOG_LEVEL.INFO, {
      ip,
      url: req.url,
    });
    next();
  });

  app.use((req, res, next) => {
    console.log(JSON.stringify(req.headers));
    next();
  });

  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100, // Limit each IP to 30 requests per 1 min
    standardHeaders: true,
    legacyHeaders: false,
  });

  // disabled for now
  // images also trigger rate limit, should move them to nginx
  // app.use(apiLimiter);
}

export { setupSettingsExpress };
