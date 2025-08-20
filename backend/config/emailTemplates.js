export const EMAIL_VERIFY_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
        
        /* Additional styles for email client compatibility */
        .text-primary {
            color: #6366F1 !important;
        }
        .bg-primary {
            background-color: #6366F1 !important;
        }
        .border-primary {
            border-color: #6366F1 !important;
        }
    </style>
</head>
<body class="bg-gray-100 font-sans">
    <!-- Preview text (hidden in email) -->
    <div style="display: none; max-height: 0px; overflow: hidden;">
        Verify your email address with the code: {{otp}}
    </div>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Main container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <!-- Header section -->
                    <tr>
                        <td align="center" style="padding: 40px 0 20px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <h1 class="text-2xl font-bold text-gray-900" style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">Verify Your Email</h1>
                                        <p class="text-gray-600 mt-2" style="font-size: 16px; color: #4b5563; margin-top: 8px;">
                                            Enter the following code to complete your registration
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- OTP code section -->
                    <tr>
                        <td align="center" style="padding: 10px 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
                                            <p class="text-gray-700 mb-4" style="font-size: 16px; color: #374151; margin-bottom: 16px;">
                                                Your verification code for <span class="font-semibold text-primary">{{email}}</span> is:
                                            </p>
                                            <div class="bg-white border border-primary rounded-lg p-4 text-center" style="background-color: #ffffff; border: 1px solid #6366F1; border-radius: 8px; padding: 16px;">
                                                <span class="text-3xl font-bold text-primary tracking-widest" style="font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #6366F1;">{{otp}}</span>
                                            </div>
                                            <p class="text-gray-500 text-sm mt-4" style="font-size: 14px; color: #6b7280; margin-top: 16px;">
                                                This code will expire in 15 minutes
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Instructions section -->
                    <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-600 mb-4" style="font-size: 16px; color: #4b5563; margin-bottom: 16px;">
                                            If you didn't request this code, please ignore this email or contact support if you have concerns.
                                        </p>
                                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px;">
                                            <p class="text-blue-700 text-sm" style="font-size: 14px; color: #1d4ed8;">
                                                <span class="font-semibold" style="font-weight: 600;">Security tip:</span> 
                                                Never share this code with anyone. Our team will never ask for it.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer section -->
                    <tr>
                        <td align="center" style="padding: 0 0 40px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-500 text-sm" style="font-size: 14px; color: #6b7280;">
                                            Need help? <a href="mailto:support@yourcompany.com" class="text-primary hover:underline" style="color: #6366F1; text-decoration: underline;">Contact our support team</a>
                                        </p>
                                        <p class="text-gray-400 text-xs mt-4" style="font-size: 12px; color: #9ca3af; margin-top: 16px;">
                                            © 2023 Your Company. All rights reserved.
                                        </p>
                                        <p class="text-gray-400 text-xs mt-2" style="font-size: 12px; color: #9ca3af; margin-top: 8px;">
                                            123 Business Ave, Suite 100, San Francisco, CA 94107
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
           
`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
        
        /* Additional styles for email client compatibility */
        .text-primary {
            color: #6366F1 !important;
        }
        .bg-primary {
            background-color: #6366F1 !important;
        }
        .border-primary {
            border-color: #6366F1 !important;
        }
    </style>
</head>
<body class="bg-gray-100 font-sans">
    <!-- Preview text (hidden in email) -->
    <div style="display: none; max-height: 0px; overflow: hidden;">
        Reset your password using this link: {{reset_link}}
    </div>


    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Main container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <!-- Header section -->
                    <tr>
                        <td align="center" style="padding: 40px 0 20px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <h1 class="text-2xl font-bold text-gray-900" style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">Password Reset</h1>
                                        <p class="text-gray-600 mt-2" style="font-size: 16px; color: #4b5563; margin-top: 8px;">
                                            Reset your password for your account
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- OTP code section -->
                    <tr>
                        <td align="center" style="padding: 10px 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-700 mb-6" style="font-size: 16px; color: #374151; margin-bottom: 24px;">
                                            We received a request to reset the password for your account associated with 
                                            <span class="font-semibold text-primary">{{email}}</span>.
                                        </p>
                                        <div class="bg-white border border-primary rounded-lg p-4 text-center" style="background-color: #ffffff; border: 1px solid #6366F1; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                                            <p class="text-gray-700 mb-2" style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                                                Your password reset OTP is:
                                            </p>
                                            <span class="text-3xl font-bold text-primary tracking-widest" style="font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #6366F1;">{{otp}}</span>
                                        </div>
                                        <p class="text-gray-500 text-sm mt-4" style="font-size: 14px; color: #6b7280; margin-top: 16px;">
                                            This OTP will expire in 15 minutes.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content section (reset link) -->
                    <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-700 mb-6" style="font-size: 16px; color: #374151; margin-bottom: 24px;">
                                            Or click the button below to reset your password:
                                        </p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td align="center">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td align="center" bgcolor="#6366F1" style="border-radius: 8px;">
                                                                <a href="{{reset_link}}" target="_blank" class="button" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 14px 30px; display: inline-block; font-weight: 600;">
                                                                    Reset Password
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <p class="text-gray-500 text-sm mt-6" style="font-size: 14px; color: #6b7280; margin-top: 24px;">
                                            This link will expire in 1 hour for security reasons.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Alternative link section -->
                    <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-500 text-sm" style="font-size: 14px; color: #6b7280;">
                                            Or copy and paste this URL into your browser:
                                        </p>
                                        <p class="text-primary text-sm mt-2 break-all" style="font-size: 14px; color: #6366F1; margin-top: 8px; word-break: break-all;">
                                            {{reset_link}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Security section -->
                    <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4" style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px;">
                                            <p class="text-yellow-700 text-sm" style="font-size: 14px; color: #92400e;">
                                                <span class="font-semibold" style="font-weight: 600;">Security notice:</span> 
                                                If you didn't request this password reset, please ignore this email. Your account remains secure.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer section -->
                    <tr>
                        <td align="center" style="padding: 0 0 40px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" class="mobile-padding" style="padding: 0 40px;">
                                        <p class="text-gray-500 text-sm" style="font-size: 14px; color: #6b7280;">
                                            Need help? <a href="mailto:support@yourcompany.com" class="text-primary hover:underline" style="color: #6366F1; text-decoration: underline;">Contact our support team</a>
                                        </p>
                                        <p class="text-gray-400 text-xs mt-4" style="font-size: 12px; color: #9ca3af; margin-top: 16px;">
                                            © 2023 Your Company. All rights reserved.
                                        </p>
                                        <p class="text-gray-400 text-xs mt-2" style="font-size: 12px; color: #9ca3af; margin-top: 8px;">
                                            123 Business Ave, Suite 100, San Francisco, CA 94107
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`