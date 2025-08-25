import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as sha256 from 'crypto-js/sha256';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService) { }
    
    public async signIn(username: string, password: string) {
      // Retrieve the user
    const user = await this.usersService.findByUsername(username);
    if (!user)
      throw new UnauthorizedException('err.invalid_login');
      
    // Hash the pass with sha256
    const passHashDigest = this.genPasswordHashDigest(password);
    console.log(passHashDigest);

    // Check password
    if (user.password != passHashDigest)
      throw new UnauthorizedException('err.invalid_login');

    return await this.authenticateUser(user);
  }

  public genPasswordHashDigest(password: string) {
    return sha256(password).toString();
  }

  private async authenticateUser(user: User) {
    // if (user.isSuspended)
    //   throw new UnauthorizedException('err.user_suspended');

    const payload = {
      //username: user.username,
      sub: user.id.toString(),
      uuid: user.uuid,
      //roles: !user.roles ? [] : user.roles.split(';')
    };
    const refreshPayload = {
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '3600s'
      }),
      refresh_token: this.jwtService.sign(refreshPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '15780000s'
      })
    };
  }

}
