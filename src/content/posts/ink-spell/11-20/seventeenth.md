---
title: 'socket.io'
description: 'nest.js 中使用 socket.io'
pubDate: '2024-08-12 10:14:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/11-20/seventeenth.jpg'
tags: ['ink-spell', 'socket.io']
selected: false
---

## socket.io

**socket.io** 是一个用于实现实时通信的 JavaScript 库。它可以在浏览器和服务器之间实现双向通信，支持多种传输协议，如 WebSocket、LongPolling、XHR 等。**socket.io** 的主要目的是为了简化实时通信在浏览器和服务器之间的实现，使得开发者可以专注于业务逻辑的实现。

**socket.io** 的主要特点包括：

1. 支持多种传输协议：**socket.io** 支持 WebSocket、LongPolling、XHR 等传输协议，可以根据浏览器和服务器的支持情况自动选择合适的传输协议。
2. 自动重连：**socket.io** 会自动检测连接断开的情况，并在适当的时候尝试重新连接。
3. 消息压缩：**socket.io** 支持对发送的消息进行压缩，以减少传输的数据量。
4. 错误处理：**socket.io** 提供了丰富的错误处理机制，可以捕获并处理客户端和服务器之间的错误。
5. 事件机制：**socket.io** 使用事件机制来处理消息，使得代码更加简洁和易于维护。

总之，**socket.io** 是一款功能强大、易于使用的实时通信库，可以帮助开发者轻松实现浏览器和服务器之间的实时通信。

## nest 中 socket.io 的使用

在 **Nest.js** 中使用 **socket.io**，需要安装 **@nestjs/platform-socket.io** 、 **@nestjs/websockets** 和 **socket.io** 三个包。

```bash
pnpm install @nestjs/platform-socket.io @nestjs/websockets socket.io
```

需要创建一个 **Gateway** 类，并继承 **WebSocketGateway** 类。在 **Gateway** 类中，可以定义一些事件处理函数，用于处理客户端发送的消息。

```typescript
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', payload)
    //  this.server.to(this.roomId).emit('newMessage', payload);  发送给 this.roomId 这个房间号的客户端
  }
}
```

在上面的例子中，我们创建了一个 **ChatGateway** 类，并继承 **WebSocketGateway** 类。在 **ChatGateway** 类中，我们定义了一个 **handleMessage** 函数，用于处理客户端发送的消息。在 **handleMessage** 函数中，我们使用 **this.server.emit** 方法将消息发送给所有连接的客户端。

前端需要安装 **socket.io-client**

```bash
pnpm add socket.io-client
```

我们需要创建一个 **socket** 对象，并连接到 **socket.io** 服务器。

```typescript
import { io } from 'socket.io-client'

export default function ChatRoom() {
  const URL = import.meta.env.VITE_SERVER_URL // 服务器地址
  const socket = io(URL)
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected, '连接') // true
    })
    socket.on('message', handleNewMessage) // 监听 newMessage 事件
    socket.emit('message', 'hello world') // 发送消息
    return () => {
      socket.off('message', handleNewMessage) // 组件卸载时，移除监听
    }
  }, [])
}
```

也就是说 **@SubscribeMessage('message')** 监听的是 **message** 事件，而 socket.emit('message', 'hello world') 发送的是 **message** 事件，所以 **@SubscribeMessage('message')** 可以接收到 **socket.emit('message', 'hello world')** 发送的消息。

然后 **this.server.emit('message', payload)** 向客户端发送消息，接着客户端可以用 **socket.on("message",(e)=>{console.loe(e)})** 来获取服务器发送的消息
