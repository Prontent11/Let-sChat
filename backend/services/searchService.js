// import { prisma } from '../prisma/'; // Your Prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export const  searchUsers=async (searchTerm,userId) =>{
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { username: { contains: searchTerm, mode: 'insensitive' } },
                { email: { contains: searchTerm, mode: 'insensitive' } },
            ],
            id: { not: userId }, // Exclude the current user
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });
    return users;
}