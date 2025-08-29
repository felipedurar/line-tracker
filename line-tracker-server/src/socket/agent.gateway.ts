import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AgentGateway {
    @WebSocketServer()
    server: Server;

    constructor(private configService: ConfigService, private jwtService: JwtService) { }

    // // Keep track of connected devices
    // private agents = new Map<string, Socket>();

    // handleConnection(client: Socket) {
    //     // e.g., use JWT payload to identify agent
    //     this.agents.set(client.id, client);
    // }

    // handleDisconnect(client: Socket) {
    //     this.agents.delete(client.id);
    // }

    // getAgentSocket(agentId: string): Socket | undefined {
    //     return this.agents.get(agentId);
    // }

    async handleConnection(client: Socket) {
        // const uuid = (client as any).user.uuid; // set by your auth middleware
        // console.log("Handling Connection: " + uuid);
        // await client.join(`agent:${uuid}`);
    }

    async handleDisconnect(client: Socket) {
        const agentId = (client as any).user?.agentId;
        // optional: cleanup, metrics, etc.
    }

    @SubscribeMessage('authenticate')
    private async handleAuth(@MessageBody() token: string, @ConnectedSocket() client: Socket) {
        console.log('JWT from client:', token);

        const deviceTokenSecret = this.configService.get<string>('DEVICE_TOKEN_SECRET');
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: deviceTokenSecret
                }
            );
            // attach to socket
            (client as any).user = payload;
            client.emit('authenticated', { status: 'ok' });

            const uuid = (client as any).user.uuid; // set by your auth middleware
            console.log("Handling Connection: " + uuid);
            await client.join(`agent:${uuid}`);
        } catch (e) {
            client.emit('authenticated', { status: 'error', message: 'Invalid token' });
            client.disconnect();
        }
    }
}