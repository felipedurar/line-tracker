import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AgentGateway {
    @WebSocketServer()
    server: Server;

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
        const uuid = (client as any).user.uuid; // set by your auth middleware
        console.log("Handling Connection: " + uuid);
        await client.join(`agent:${uuid}`);
    }

    async handleDisconnect(client: Socket) {
        const agentId = (client as any).user?.agentId;
        // optional: cleanup, metrics, etc.
    }
}