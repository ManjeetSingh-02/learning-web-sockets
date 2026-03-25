// internal-imports
import { redisPublisher, redisSubscriber } from '../core/index.js';

// external-imports
import { Server } from 'socket.io';

// create a new Socket.IO server instance
export const io = new Server();

// subscribe to Redis channel for socket data
redisSubscriber.subscribe('socket-data');

// handle messages from Redis and emit to connected clients
redisSubscriber.on('message', (_channel, message) => {
  if (message) {
    // parse the message from Redis
    const { event, data } = JSON.parse(message);

    // emit the event to all connected clients
    io.emit(event, data);
  }
});

// handle new client connections
io.on('connection', socket => {
  // handle client-data event
  socket.on('client-data', async data => {
    // publish the data to Redis channel
    await redisPublisher.publish(
      'socket-data',
      JSON.stringify({
        event: 'server-data',
        data,
      })
    );
  });
});
