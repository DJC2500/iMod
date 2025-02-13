// // // client.js code

// // class WebSocketService {
// //     private socket: WebSocket | null = null;
// //     private listeners: ((message: any) => void)[] = [];
  
// //     connect(url: string) {
// //       this.socket = new WebSocket(url);
  
// //       this.socket.onopen = () => console.log("Connected to WebSocket server");
      
// //       this.socket.onmessage = (event) => {
// //         const message = JSON.parse(event.data);
// //         this.listeners.forEach((listener) => listener(message));
// //       };
       
// //       wsService.onMessage((msg) => {
// //   console.log(`Message from ${msg.sender}: ${msg.content}`);
// //   setMessages((prevMessages) => [
// //     ...prevMessages,
// //     { id: Date.now().toString() + '-bot', type: 'received', text: msg.content }
// //   ]);
// // });

// //       this.socket.onclose = () => console.log("Disconnected from WebSocket server");
// //     }
  
// //     sendMessage(message: any) {
// //       if (this.socket && this.socket.readyState === WebSocket.OPEN) {
// //         this.socket.send(JSON.stringify(message));
// //       } else {
// //         console.warn("WebSocket is not connected.");
// //       }
// //     }
  
// //     onMessage(callback: (message: any) => void) {
// //       this.listeners.push(callback);
// //     }
  
// //     disconnect() {
// //       this.socket?.close();
// //     }
// //   }
  
// //   export const wsService = new WebSocketService();
  

// class WebSocketService {
//   private socket: WebSocket | null = null;
//   private listeners: ((message: any) => void)[] = [];

//   // Connect to the WebSocket server
//   connect(url: string) {
//     this.socket = new WebSocket(url);

//     this.socket.onopen = () => {
//       console.log("Connected to WebSocket server");
//     };

//     this.socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       this.listeners.forEach((listener) => listener(message));
//     };

//     this.socket.onclose = () => {
//       console.log("Disconnected from WebSocket server");
//     };
//   }

//   // Send a message to the WebSocket server
//   sendMessage(message: any) {
//     if (this.socket && this.socket.readyState === WebSocket.OPEN) {
//       this.socket.send(JSON.stringify(message));
//     } else {
//       console.warn("WebSocket is not connected.");
//     }
//   }

//   // Register a listener to handle incoming messages
//   onMessage(callback: (message: any) => void) {
//     this.listeners.push(callback);
//   }

//   // Close the WebSocket connection
//   disconnect() {
//     this.socket?.close();
//   }
// }

// export const wsService = new WebSocketService();


class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: ((message: any) => void)[] = [];

  // Connect to the WebSocket server
  connect(url: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already connected.");
      return;
    }

    console.log(`Connecting to WebSocket at ${url}...`);
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    this.socket.onmessage = (event) => {
      console.log("📩 Raw WebSocket message received:", event.data);
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Parsed WebSocket message:", message);
        this.listeners.forEach((listener) => listener(message));
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    this.socket.onclose = (event) => {
      console.warn("🔌 Disconnected from WebSocket server:", event.reason);
      setTimeout(() => {
        console.log("🔄 Attempting to reconnect...");
        this.connect(url);
      }, 3000);
    };
  }

  // Send a message to the WebSocket server
  sendMessage(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("📤 Sending message:", message);
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn("⚠️ WebSocket is not connected. Message not sent.");
    }
  }

  // Register a listener to handle incoming messages
  onMessage(callback: (message: any) => void) {
    this.listeners.push(callback);
  }

  // Close the WebSocket connection
  disconnect() {
    console.log("❌ Closing WebSocket connection...");
    this.socket?.close();
  }
}

export const wsService = new WebSocketService();
