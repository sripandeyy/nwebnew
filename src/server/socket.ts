import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { postsStore } from './linkedin/postsStore';
import { tokenStore } from './linkedin/tokenStore';
import { isLinkedInConfigured, getLinkedInConfig } from './linkedin/config';
import { LinkedInStatusResponse, NormalizedLinkedInPost } from './linkedin/types';

// Read-only channel: browsers receive feed updates but cannot trigger LinkedIn API calls.
class SocketManager {
  private io: SocketIOServer | null = null;

  public init(httpServer: HttpServer): SocketIOServer {
    if (this.io) {
      return this.io;
    }

    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: getLinkedInConfig().allowedOrigins,
        methods: ['GET'],
      },
      transports: ['websocket', 'polling'],
    });

    this.io.on('connection', (socket: Socket) => {
      socket.emit('linkedin:status', this.getStatusSnapshot());
      socket.emit('linkedin:posts_updated', {
        posts: postsStore.getAllPosts(),
        lastSyncTime: postsStore.getLastSyncTime(),
      });
    });

    return this.io;
  }

  public getIO(): SocketIOServer | null {
    return this.io;
  }

  public broadcastPostsUpdated(posts: NormalizedLinkedInPost[], lastSyncTime: string | null): void {
    if (!this.io) return;
    this.io.emit('linkedin:posts_updated', {
      posts,
      lastSyncTime,
    });
  }

  public broadcastNewPosts(count: number, newPosts: NormalizedLinkedInPost[]): void {
    if (!this.io) return;
    this.io.emit('linkedin:new_posts', {
      count,
      posts: newPosts,
      timestamp: new Date().toISOString(),
    });
  }

  public broadcastStatus(status: LinkedInStatusResponse): void {
    if (!this.io) return;
    this.io.emit('linkedin:status', status);
  }

  public getStatusSnapshot(): LinkedInStatusResponse {
    const config = getLinkedInConfig();
    const configured = isLinkedInConfigured();
    const authenticated = tokenStore.hasValidToken();

    return {
      configured,
      authenticated,
      live: configured && authenticated && tokenStore.isVerified(),
      organizationId: config.orgId || null,
      organizationUrn: config.orgUrn || null,
      apiVersion: config.apiVersion,
      lastSyncTime: postsStore.getLastSyncTime(),
      syncInProgress: postsStore.isSyncInProgress(),
      postCount: postsStore.getPostCount(),
      pollingIntervalMs: config.syncIntervalMs,
      error: postsStore.getLastError(),
    };
  }
}

export const socketManager = new SocketManager();
