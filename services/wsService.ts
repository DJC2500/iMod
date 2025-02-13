class WebSocketService {
    private socket: WebSocket | null = null;
    private listeners: ((message: any) => void)[] = [];
  
    connect(url: string) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => console.log("Connected to WebSocket server");
      
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.listeners.forEach((listener) => listener(message));
      };
  
      this.socket.onclose = () => console.log("Disconnected from WebSocket server");
    }
  
    sendMessage(message: any) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.warn("WebSocket is not connected.");
      }
    }
  
    onMessage(callback: (message: any) => void) {
      this.listeners.push(callback);
    }
  
    disconnect() {
      this.socket?.close();
    }
  }
  
  export const wsService = new WebSocketService();
  