import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Creating a Nodemailer Using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail password or App Password
    },
    tls: {
        rejectUnauthorized: false // This is to allow self-signed certificates
    }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to take messages");
  }
});

export default transporter;
