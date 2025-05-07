export const PRODUCT_CREATED_TEMPLATE = (
    name: string,
    category: string,
    price: number,
    quantity: number
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Product Created Successfully</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f2f2f2;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; color: #4CAF50;">✅ Product Created Successfully</h2>
      <p>Dear Farmer,</p>
      <p>Your product has been successfully added to the FarmerSmart platform. Here are the details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; font-weight: bold;">Product Name</td>
          <td style="padding: 10px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Category</td>
          <td style="padding: 10px;">${category}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; font-weight: bold;">Price</td>
          <td style="padding: 10px;">$${price.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Quantity</td>
          <td style="padding: 10px;">${quantity}</td>
        </tr>
      </table>
  
      <p>Thank you for using FarmerSmart to reach more buyers and grow your farm business.</p>
      <p>Best regards,<br>FarmerSmart Team</p>
  
      <hr style="margin-top: 40px;">
      <p style="text-align: center; font-size: 12px; color: #888;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;
