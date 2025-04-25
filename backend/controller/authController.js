import pkg from '@prisma/client'
import { hashPassword, comparePassword, generateToken } from '../utils/authUtils.js';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from the package
import { z } from 'zod'; // Import zod for validation

const prisma = new PrismaClient();

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Sign up route (register user)
export const signUp = async (req, res) => {
  const { username, email, password } = signUpSchema.parse(req.body);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = generateToken(newUser.id);

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login route (authenticate user)
export const login = async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with hashed one
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user.id);
   const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json({ message: 'Login successful', token,userData: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
