import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
//import { createClient } from 'ioredis';
import createClient from "ioredis";
import * as jwt from 'jsonwebtoken';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  public constructor(
    private readonly app: INestApplicationContext,
    private readonly configService: ConfigService
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = new createClient({ host: 'redis', port: 6379 });
    const subClient = pubClient.duplicate();

    //await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: "*", // adjust to match the frontend
        methods: ["GET", "POST"],
      },
    });
    server.adapter(this.adapterConstructor);

    const jwtSecret: string = this.configService.get<string>('DEVICE_TOKEN_SECRET') as string;

    // Authentication middleware
    // server.use((socket, next) => {
    //   const token =
    //     socket.handshake.auth?.token ||
    //     socket.handshake.query?.token ||
    //     socket.handshake.headers?.authorization;
    //   if (!token) {
    //     return next(new Error('No token'));
    //   }

    //   try {
    //     const payload = jwt.verify(token, jwtSecret);
    //     (socket as any).user = payload; // attach user payload globally
    //     next();
    //   } catch (err) {
    //     next(new Error('Invalid token'));
    //     console.log("Invalid Token");
    //   }
    // });

    return server;
  }
}