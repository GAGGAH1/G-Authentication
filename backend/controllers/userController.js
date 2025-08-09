import userModel from "../models/userModel.js";

export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        // const {userId} = req.body; // If userId is passed in the request body
        const user = await userModel.findById(userId).select('name isAccountVerified'); // Include name and isAccountVerified from response
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user info:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
} 
