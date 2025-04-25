// import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

export const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.headers.token; // Get token from socket handshake
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error: Invalid or expired token'));
    }
    socket.user = decoded; // Attach user data to socket object
    next(); // Continue to the next middleware or event handler
  });
}