export const WELCOME_EMAIL_TEMPLATE = (userName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FarmerSmart</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to FarmerSmart!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi User,</p>
    <p>We’re thrilled to have you on board! 🎉</p>
    <p>FarmerSmart is built to empower farmers and buyers by connecting them directly. Here’s what you can do:</p>
    <ul>
      <li>🌾 List your farm produce easily</li>
      <li>📦 Browse quality products from local farms</li>
      <li>🔒 Enjoy secure payments and trusted delivery</li>
    </ul>
    <p>If you have any questions or feedback, feel free to reach out to us. We’re here to help!</p>
    <p>Happy farming,<br>The FarmerSmart Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
