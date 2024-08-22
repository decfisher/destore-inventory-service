import { Product } from '../models/product';

export default function lowStockEmailBody(recipient: string, product: Product) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Low Stock Alert</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; line-height: 1.6;">
            <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <div style="background-color: #ff6f61; color: #ffffff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">Low Stock Alert</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear Store Manager,</p>
                    <p>We wanted to notify you that the stock level for the following product is running low:</p>
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="flex: 1;">
                            <h2 style="margin: 0;">${product.name}</h2>
                        </div>
                    </div>
                    <div style="background-color: #ffeb3b; padding: 10px; border-radius: 4px; font-weight: bold; text-align: center;">
                        Current Stock Level: <strong>${product.quantity}</strong>
                    </div>
                    <a href="#" style="display: block; text-align: center; padding: 15px 10px; background-color: #ff6f61; color: #ffffff; text-decoration: none; border-radius: 4px; margin-top: 20px;">
                        Reorder Now
                    </a>
                </div>
                <div style="text-align: center; padding: 10px; font-size: 12px; color: #777777;">
                    <p style="margin: 0;">Thank you for using our inventory management system.</p>
                    <p style="margin: 0;">&copy; 2024 DE-Store Management. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
}
