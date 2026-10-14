import http from 'http';
import { app } from './app';
import { socketManager } from './socket';
import { syncService } from './linkedin/syncService';
import { getLinkedInConfig, isLinkedInConfigured } from './linkedin/config';

const config = getLinkedInConfig();
const port = config.port;

const httpServer = http.createServer(app);

// Initialize Socket.IO
socketManager.init(httpServer);

// Start scheduled background synchronization
syncService.start();

function startServer(p: number) {
  httpServer.listen(p, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 NYERAS Express & Socket.IO Server Running on Port ${p}`);
    console.log(`======================================================`);
    console.log(`• LinkedIn Status:      GET  http://localhost:${p}/api/linkedin/status`);
    console.log(`• LinkedIn Posts Feed:  GET  http://localhost:${p}/api/linkedin/posts`);
    console.log(`• LinkedIn OAuth Start: GET  http://localhost:${p}/api/linkedin/auth`);
    console.log(`• LinkedIn Callback:    GET  http://localhost:${p}/api/linkedin/callback`);
    console.log(`• LinkedIn Sync Trigger:POST http://localhost:${p}/api/linkedin/sync`);
    console.log(`• Socket.IO Live Feed:  ws://localhost:${p}`);
    console.log(`• Configured:           ${isLinkedInConfigured() ? 'YES' : 'NO (Awaiting credentials)'}`);
    console.log(`• LinkedIn API Version: ${config.apiVersion}`);
    console.log(`• Admin Key:            ${config.adminKey ? 'set' : 'not set (admin endpoints localhost-only)'}`);
    console.log(`• Polling Interval:     ${config.syncIntervalMs / 1000}s`);
    console.log(`======================================================\n`);
  });
}

// Fail loudly instead of silently moving ports: the OAuth redirect URI and
// NEXT_PUBLIC_SOCKET_URL / LINKEDIN_BACKEND_URL are bound to this exact port.
httpServer.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Server] Port ${port} is already in use. Free it or set PORT (and update LINKEDIN_REDIRECT_URI, LINKEDIN_BACKEND_URL, NEXT_PUBLIC_SOCKET_URL).`);
  } else {
    console.error('[Server] Server listen error:', err);
  }
  process.exit(1);
});

startServer(port);

export { httpServer, app };
