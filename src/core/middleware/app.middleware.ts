import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';

export function middleware(app: INestApplication): INestApplication {
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());

  const isProduction = process.env.NODE_ENV === 'production';
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? true : false,
      crossOriginEmbedderPolicy: isProduction ? true : false,
    }),
  );
  return app;
}
