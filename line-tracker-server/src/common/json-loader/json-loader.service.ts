import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JsonLoaderService {

    public static CONFIG_FOLDER = "config";

    public async readConfigJsonFile(filename: string) {
        const filePath = path.join(__dirname, '..', '..', JsonLoaderService.CONFIG_FOLDER, filename);
        const rawData = await fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        return jsonData;
    }

}
