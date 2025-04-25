// utils/activeUsers.js
const activeUsers = new Map(); // userId -> socketId

export const addUser = (userId, socketId) => {
  activeUsers.set(userId, socketId);
};

export const removeUser = (socketId) => {
  for (const [userId, sId] of activeUsers) {
    if (sId === socketId) {
      activeUsers.delete(userId);
      break;
    }
  }
};

export const getSocketId = (userId) => {
  return activeUsers.get(userId);
};
