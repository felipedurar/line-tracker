import { Injectable, NotFoundException } from '@nestjs/common';
import RegisterDeviceDto from './dto/register-device.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import DeviceTokenPayloadModel from './models/device-token-payload.model';

@Injectable()
export class DevicesService {

    constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

    public async register(registerDto: RegisterDeviceDto) {
        const cDevice = await this.prisma.device.create({
            data: {
                uuid: uuidv4(),
                deviceType: registerDto.deviceType,
                hardwareId: registerDto.hardwareId,
                deviceName: registerDto.deviceName,
                nickname: registerDto.nickname,
                description: registerDto.description
            }
        });

        return cDevice;
    }

    public async getDeviceToken(id: number) {
        // Find the Device
        const deviceFound = await this.prisma.device.findFirst({
            where: {
                id: { equals: Number(id) }
            }
        });
        if (!deviceFound) {
            throw new NotFoundException("Device not found");
        }

        // const payload = { 
        //     username: user.username,
        //     sub: user.id.toString(),
        //     uuid: user.uuid,
        //     roles: !user.roles ? [] : user.roles.split(';')
        // };
        // const refreshPayload = {
        //     sub: user.id
        // };
        // Generate the Token
        const deviceTokenPayloadModel: DeviceTokenPayloadModel = new DeviceTokenPayloadModel();
        deviceTokenPayloadModel.sub = deviceFound.id;
        deviceTokenPayloadModel.uuid = deviceFound.uuid;
        deviceTokenPayloadModel.manifestVersion = ''; 
        return {
            access_token: this.jwtService.sign({ ...deviceTokenPayloadModel }, {
                secret: this.configService.get<string>('DEVICE_TOKEN_SECRET'),
                //expiresIn: '3600s'
            }),
            // refresh_token: this.jwtService.sign(refreshPayload, {
            //     secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            //     expiresIn: '15780000s'
            // })
        };
    }


}
