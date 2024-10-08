import WebSocket, { Server as WebSocketServer } from 'ws';
import { Server as HTTPServer, createServer, IncomingMessage, ServerResponse } from 'http';

class MessageService {
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
  send(message: string): void {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

// Create HTTP server only once
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Instantiate MessageService only once
const messageService = new MessageService(server);

// Start sending messages every 5 seconds as an example
setInterval(() => {
  messageService.send('Hello, this is a message from the server!');
}, 5000);

// Start the HTTP server and listen on a port
server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

// Export the message service instance for use elsewhere
export default messageService;
