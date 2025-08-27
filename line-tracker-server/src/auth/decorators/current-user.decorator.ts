import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface CurrentUserOptions {
    required?: boolean;
}

export interface RequestUser {
    id: bigint;
    uuid: string;
    username: string;
    roles: string[]
}

export const CurrentUser = createParamDecorator(
    (options: CurrentUserOptions = {}, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        
        if (options.required && !user) {
            throw new UnauthorizedException();
        }

        return {
            id: BigInt(user.sub),
            username: user.username,
            roles: user.roles as string[],
            uuid: user.uuid
        } as RequestUser;
    },
);