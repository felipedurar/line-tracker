import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { AgentGateway } from 'src/socket/agent.gateway';
import * as path from 'path';

@Injectable()
export class FileSystemService {

    constructor(private gateway: AgentGateway) {}

    // Returns if it is a file of a path
    // the 'type' is the priority, if it is missing, it checks if the path contains some extension (no extension = folder)
    public getAccessType(path_str: string, type: string) {
        if (!!type) return type;
        if (!path_str) return null;
        return path.extname(path_str) !== '' ? 'file' : 'folder';
    }

    public async createFileOrFolder(agentId: string, type: string, path: string) {
        //this.gateway.server.timeout(10000)


        const result = await new Promise((resolve, reject) => {
            this.gateway.server
                .timeout(10000)
                .to(`agent:${agentId}`)
                .emit('command', { cmd: 'create_file_folder', path: path }, (err: any, responses: any[]) => {
                    if (err) return reject(new Error('Timeout or no agent response'));
                    // since the room has one socket, responses[0] is your agent's reply
                    resolve(responses?.[0] ?? null);
                });
        });
        if (!result)
            throw new NotFoundException(`The agentid ${agentId} is not connected!`);
        
        return result;
    }

    // //@Get(':agentId/files')
    // async listFiles(@Param('agentId') agentId: string) {
    //     // Broadcast-with-ack to a room that contains exactly that single agent
    //     return await new Promise((resolve, reject) => {
    //         this.gateway.server
    //             .timeout(8000) // ← important for timeouts
    //             .to(`agent:${agentId}`)
    //             .emit('command', { cmd: 'ls', path: '/home/ul_machine/reports' }, (err: any, responses: any[]) => {
    //                 if (err) return reject(new Error('Timeout or no agent response'));
    //                 // since the room has one socket, responses[0] is your agent's reply
    //                 resolve(responses?.[0] ?? null);
    //             });
    //     });
    // }

}
