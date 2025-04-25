import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { authMiddleware, socketAuthMiddleware } from './middleware/authMiddleware.js';
import userRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRoute.js';
import { socketHandler } from './utils/socketUtils.js';
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});
const PORT = 3000;
app.use(express.json()); // Middleware to parse JSON bodies

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/user/',userRouter);


// app.use(authMiddleware); // Apply auth middleware to all routes after this point
app.use('/api/message',authMiddleware,messageRouter);

//socket.io connection
io.use(socketAuthMiddleware);
io.on('connection', (socket) => socketHandler(socket, io));

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});