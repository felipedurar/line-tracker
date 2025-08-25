import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ManifestModule } from './manifest/manifest.module';
import { DevicesModule } from './devices/devices.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CommonModule, 
    AuthModule, 
    UsersModule, 
    ManifestModule, 
    DevicesModule, SocketModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService
  ],
})
export class AppModule {}
