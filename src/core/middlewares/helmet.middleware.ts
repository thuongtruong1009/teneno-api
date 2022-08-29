import type { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
// import compression from 'compression';
// import passport from 'passport';

export function helmetMiddleware(app: INestApplication): INestApplication {
  // function shouldCompress(req, res) {
  //   if (req.headers['x-no-compression']) {
  //     return false;
  //   }
  //   return compression.filter(req, res);
  // }
  // app.use(compression({ filter: shouldCompress }));
  // app.use(passport.initialize());
  // app.use(passport.session());

  const isProduction = process.env.NODE_ENV === 'production';
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? true : false,
      crossOriginEmbedderPolicy: isProduction ? true : false,
    }),
  );
  return app;
}
