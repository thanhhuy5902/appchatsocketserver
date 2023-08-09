import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const roomId = payload.roomId;
    console.log('messages ', payload);
    this.server.emit('message-' + roomId, payload);
    return 'Hello world!';
  }
}
