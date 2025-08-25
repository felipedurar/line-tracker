import { Injectable } from '@nestjs/common';
import { JsonLoaderService } from 'src/common/json-loader/json-loader.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ManifestService {

    private MANIFEST_FILE = "manifest.json";

    constructor(private jsonLoaderService: JsonLoaderService, private prisma: PrismaService) {}



    public async getManifest() {
        // await this.prisma

        return await this.jsonLoaderService.readConfigJsonFile(this.MANIFEST_FILE);
    }

}
