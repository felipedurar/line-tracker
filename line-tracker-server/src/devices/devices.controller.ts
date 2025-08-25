import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import RegisterDeviceDto from './dto/register-device.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {

    constructor(private deviceService: DevicesService) {}

    @Post('/register')
    @ApiBearerAuth('JWT-auth')
    public async register(
        @Body() registerDto: RegisterDeviceDto
    ): Promise<any> {
        return await this.deviceService.register(registerDto);
    }

    @Get('/:id/token')
    @ApiBearerAuth('JWT-auth')
    public async getToken(
        @Param('id') id: number
    ) {
        return await this.deviceService.getDeviceToken(id);
    }

}
