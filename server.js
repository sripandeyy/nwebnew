// Production Next.js server runner for Hostinger / cPanel / Cloud / VPS hosting
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Capture early uncaught exceptions and rejections for Hostinger log visibility
process.on('uncaughtException', (err) => {
  console.error('[Nyeras Fatal] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Nyeras Fatal] Unhandled Rejection at:', promise, 'reason:', reason);
});

// Load environment variables (.env) if available
try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional in environments where host sets variables
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Hostinger / Phusion Passenger assigns PORT as either:
// 1. A TCP port number (e.g. 3000)
// 2. A Unix domain socket path (e.g. /tmp/passenger.xxx/socket)
// 3. The string "passenger"
const rawPort = process.env.PORT || '3000';
const isSocket = isNaN(Number(rawPort));
const port = isSocket ? rawPort : parseInt(rawPort, 10);

console.log(`[Nyeras] Initializing Next.js production server...`);
console.log(`[Nyeras] Environment: NODE_ENV=${process.env.NODE_ENV}, Node=${process.version}`);
console.log(`[Nyeras] Target: ${isSocket ? `Socket "${port}"` : `TCP http://${hostname}:${port}`}`);

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('[Nyeras] Request handling error on', req.url, ':', err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        }
      }
    });

    server.once('error', (err) => {
      console.error('[Nyeras] Server listener error:', err);
      process.exit(1);
    });

    // Graceful shutdown signals
    const shutdown = (signal) => {
      console.log(`[Nyeras] Received ${signal}, closing HTTP server...`);
      server.close(() => {
        console.log('[Nyeras] Server stopped gracefully.');
        process.exit(0);
      });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    if (isSocket) {
      // Unix domain socket or 'passenger' special socket name (do not pass hostname)
      server.listen(port, () => {
        console.log(`[Nyeras] Server ready and listening on socket: ${port}`);
      });
    } else {
      // Standard TCP port
      server.listen(port, hostname, () => {
        console.log(`[Nyeras] Server ready and listening on http://${hostname}:${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('[Nyeras] Failed to start server during app.prepare():', err);
    process.exit(1);
  });
