import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js"; // Assuming you have a mailer config set up

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "Please fill all the fields"});
    }

    try {
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashPassword});
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });

        // Sending welcome email (optional)
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: "Welcome to Our Service",
        //     text: `Hello ${name},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest regards,\nThe Team`
        // };

        //Using Gmail transporter to send email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: "Welcome to Our Service",
            text: `Hello ${name},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest regards,\nThe Team`
        };

        // Uncomment the following lines if you have a mail service set up
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            }
            else {
                console.log("Email sent successfully:", info.response);
            }
        });

        return res.status(201).json({success: true, message: "User registered successfully", data: user});
    }   catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message: "Email and Password are required"});
    }
    
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid Email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid Password"});
        }

        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({success: true, message: "Login successful", data: user});

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.status(200).json({success: true, message: "Logout successful"});
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) =>{
    try {
        // const { userId } = req.body; This is not needed as we are using userAuth middleware to get userId from token
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if(user.isAccountVerified){
            return res.status(400).json({success: false, message: "Account Already Verified"});
        }
        
        const otp = String(Math.floor(100000 + Math.random() * 900000));

       
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            // to: process.env.GMAIL_USER,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}.Verify your account using this OTP.`
        }

        let emailSent = true
        try {
            await transporter.sendMail(mailOptions)
            console.log("Email sent (or attempted)!")
        } catch (emailError) {
            emailSent = false;
             console.error("Failed to send verification email:", emailError);
        }
      

      return res.status(200).json({success: true, message: emailSent ? "Verification OTP sent to Email" : "Failed to send Verification OTP"});
    } catch (error) {
        console.error("Error during sending OTP:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }            
}

// Verify the Email using the OTP
export const verifyEmail = async (req, res) => {

    const { otp } = req.body;
    const userIdFromToken = req.user.id; // Get userId from token

        if(!otp){
            return res.status(400).json({success: false, message: "Missing Details"});
        }

    try {
        const user = await userModel.findById(userIdFromToken);

        if(!user){
            return res.status(404).json({success: false, message: "User not Found"});
        }

        if(user.isAccountVerified) {
           return res.status(400).json({success: false, message: "Account Already Verified"}) 
        }

        // Check if OTP is present
        if(user.verifyOtp === "" || !user.verifyOtp) {
            return res.status(400).json({success: false, message: "No OTP found. Please request a new one."})
        }

        // Check if OTP is expired
        if(Number(user.verifyOtpExpireAt) < Date.now()) {
            return res.status(400).json({success: false, message: "OTP Expired. Please request a new one."})
        }
        // Check if OTP is valid
        if(user.verifyOtp !== otp) {
            return res.status(400).json({success: false, message: "Invalid OTP"})
        }

        // If OTP is valid, mark the account as verified
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ 
            success: true, message: "Successfully Verified Email",})
    } catch (error) {
        console.error("Error verifying Email.", error)
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}


// Check if is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "Successfully Authenticated"})
    } catch (error) {
        console.error("Error checking authentication:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

// Send Password Reset OTP to the User's Email
export const sendResetPasswordOtp = async (req, res) => {   
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes from now

        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}.Use this OTP to reset your password.`
        };

        let emailSent = true;
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent (or attempted)!");
        } catch (emailError) {
            emailSent = false;
            console.error("Failed to send password reset email:", emailError);
        }

        return res.status(200).json({ success: true, message: emailSent ? "Password reset OTP sent to Email" : "Failed to send Password reset OTP" });
    } catch (error) {
        console.error("Error during sending password reset OTP:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Reset User Password using the OTP
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "Email,OTP & New Password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if OTP is present
        if (user.resetOtp === "" || !user.resetOtp) {
            return res.status(400).json({ success: false, message: "No OTP found. Please request a new one." });
        }

        // Check if OTP is expired
        if (Number(user.resetOtpExpireAt) < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP Expired. Please request a new one." });
        }

        // Check if OTP is valid
        if (user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // If OTP is valid, reset the password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }   
}