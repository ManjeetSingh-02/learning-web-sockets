// external-imports
import { Server } from 'socket.io';

// create a new Socket.IO server instance
export const io = new Server();

// handle new client connections
io.on('connection', socket => {
  // handle client-data event
  socket.on('client-data', data => {
    // log the received data along with the socket ID
    console.log(`[${socket.id}] - ${data}`);

    // broadcast the data to all other connected clients
    io.emit('server-data', data);
  });
});
