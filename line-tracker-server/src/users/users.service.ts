import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    // public async findByEmail(email: string): Promise<User | undefined> {
    //     const foundUser = await this.prisma.user.findFirst({
    //         where: {
    //             email: { equals: email }
    //         }
    //     });
    //     return foundUser;
    // }
    
    public async findByUsername(username: string): Promise<User | undefined> {
        const foundUser = await this.prisma.user.findFirst({
            where: {
                username: { equals: username }
            }
        });
        return foundUser;
    }

}
