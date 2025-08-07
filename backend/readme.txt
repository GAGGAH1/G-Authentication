Create a sendMail.js file in the root of your project and add the following code:
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;


 // Sending welcome email (optional)
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Our Service",
            text: `Hello ${name},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest regards,\nThe Team`
        };

        
         await transporter.sendMail(mailOptions)