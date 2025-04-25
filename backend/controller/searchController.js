import { searchUsers } from "../services/searchService.js";


export const searchController= async (req, res) => {
    const { searchTerm,userId } = req.query; // Get the search term from the query parameters
    console.log("searchTerm",searchTerm);
    // const userId = req.user.id; // Get the user ID from the request object (assuming user is authenticated)
    
    if (!searchTerm) {
        return res.status(400).json({ message: "Search term is required" });
    }

    try {
        // Fetch users based on the search term
        const users = await searchUsers(searchTerm, parseInt(userId)); // Call the search service function

        res.status(200).json(users); // Send the list of users as a response
    } catch (error) {
        console.error("Error searching for users:", error);
        res.status(500).json({ message: "Error searching for users" });
    }
}