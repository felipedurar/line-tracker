import { Controller, Get } from '@nestjs/common';
import { ManifestService } from './manifest.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Manifest')
@Controller('manifest')
export class ManifestController {

    constructor(private manifestService: ManifestService) {}

    @Get()
    @ApiBearerAuth('JWT-auth')
    public async getManifest(
        // @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
        // @CurrentUser() currentUser: RequestUser
    ): Promise<any> {
        return await this.manifestService.getManifest();
    }


}
