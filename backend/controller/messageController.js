import { sendMessageToDB } from "../services/MessageService.js";

export const sendMessage = async (socket, data) => {
  // Validate message data
  const message = await sendMessageToDB(data);
  socket.emit('new-message', message); // Emit event to sender
};

export const getConversation= async (req,res)=>{
    const { userId2 } = req.params; // Get userId from request parameters
    const userId1=req.user.id; // Get userId from request object (assuming user is authenticated)
    if (!userId2) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const messages = await getMessagesForOneToOneChat(userId1,userId2); // Fetch messages for the user
        res.status(200).json(messages); // Send messages as response
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
}