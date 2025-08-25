import { ApiProperty } from "@nestjs/swagger";
import { DeviceType } from "@prisma/client";

export default class RegisterDeviceDto {
    @ApiProperty()
    public deviceType: DeviceType;

    @ApiProperty()
    public hardwareId: string;

    @ApiProperty()
    public deviceName: string;

    @ApiProperty()
    public nickname: string;

    @ApiProperty()
    public description: string;

}
