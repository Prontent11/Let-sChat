// sockets/socketHandler.js
import { sendMessageToDB } from '../services/MessageService.js';
import { addUser, removeUser, getSocketId} from './activeUsersUtils.js';

export const socketHandler = (socket, io) => {
  console.log('User connected:', socket.id);

  // Listen for joining with userId
  socket.on('join', (userId) => {
    addUser(userId, socket.id);
    console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  // Handle sending message
  socket.on('send-message', async ({ senderId, receiverId, content }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${content}`);
    const message = await sendMessageToDB({senderId, receiverId, content});

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive-message', message);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('User disconnected:', socket.id);
  });
};
