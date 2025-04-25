import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


export const sendMessageToDB = async (data) => {
  const { senderId, receiverId, content } = data;

  return await prisma.message.create({
    data: {
      senderId:parseInt(senderId),
      receiverId:parseInt(receiverId),
      content,
    },
  });
};

export const getMessagesForOneToOneChat = async (userId1, userId2) => {
    return await prisma.message.findMany({
        where: {
        OR: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 },
        ],
        },
        orderBy: {
        createdAt: 'asc',
        },
    });
}
