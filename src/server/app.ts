import express, { Express } from 'express';
import cors from 'cors';
import { linkedinRouter } from './linkedin/routes';
import { getLinkedInConfig } from './linkedin/config';

export function createExpressApp(): Express {
  const app = express();
  app.disable('x-powered-by');

  // Only the NYERAS frontend origin(s) may call this API from a browser
  app.use(cors({
    origin: getLinkedInConfig().allowedOrigins,
    methods: ['GET', 'POST'],
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // Mount LinkedIn integration routes
  app.use('/api/linkedin', linkedinRouter);

  return app;
}

export const app = createExpressApp();
