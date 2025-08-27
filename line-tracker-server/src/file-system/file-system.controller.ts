import { BadRequestException, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, RequestUser } from 'src/auth/decorators/current-user.decorator';
import { FileSystemService } from './file-system.service';

@Controller('file-system')
export class FileSystemController {

    constructor(private fileSystemService: FileSystemService) {}

    @Post(':agentid/*path')
    @ApiBearerAuth('JWT-auth')
    public async handlePostPath(
        @Param('agentid') agentId: string,
        @Param('path') path: string,
        @Query('type') q_type: string,
        @CurrentUser() currentUser: RequestUser
    ) {
        const target_type = this.fileSystemService.getAccessType(path, q_type);
        if (!target_type)
            throw new BadRequestException("Invalid Target Type");
        
        return await this.fileSystemService.createFileOrFolder(agentId, target_type, path);
        // return {
        //     agentId,
        //     path, // e.g. "c/Users/test/Documents/test.txt"
        // };
    }

}
