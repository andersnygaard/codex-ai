// webSocketService.ts
import WebSocket, { Server as WebSocketServer } from 'ws';
import { Server as HTTPServer, createServer, IncomingMessage, ServerResponse } from 'http';

class WebSocketService {
  private wss: WebSocketServer;
  private clients: Set<WebSocket>;

  constructor(server: HTTPServer) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Set<WebSocket>();

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New client connected');
      this.clients.add(ws);

      ws.on('message', (message: string) => {
        console.log(`Received: ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
        this.clients.delete(ws);
      });
    });
  }

  // Method to broadcast a message to all connected clients
  broadcast(message: string): void {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
  });
  
  // Start the WebSocket service
  const webSocketService = new WebSocketService(server);
  
  // Example: sending a message from the server after 5 seconds
  setTimeout(() => {
    webSocketService.broadcast('Hello, this is a message from the server!');
  }, 5000);
  
  // Start the HTTP server
  server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
  
const instance = new WebSocketService(server);

export default instance;
