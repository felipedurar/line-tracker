import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign In' })
  @Public()
  public async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }



}
