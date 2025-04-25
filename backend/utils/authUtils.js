import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Compare password with hash
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1h', // Token expires in 1 hour
  });
  return token;
};
