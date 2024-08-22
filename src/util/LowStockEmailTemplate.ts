import { Product } from '../models/product';

export default function lowStockEmailBody(recipient: string, product: Product) {
    return `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Low Stock Alert</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        line-height: 1.6;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color: #ff6f61;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                    }
                    .product-info {
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .product-info img {
                        max-width: 100px;
                        border-radius: 8px;
                        margin-right: 20px;
                    }
                    .product-info div {
                        flex: 1;
                    }
                    .stock-level {
                        background-color: #ffeb3b;
                        padding: 10px;
                        border-radius: 4px;
                        font-weight: bold;
                        text-align: center;
                    }
                    .cta-button {
                        display: block;
                        width: 100%;
                        text-align: center;
                        padding: 15px;
                        background-color: #ff6f61;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 4px;
                        margin-top: 20px;
                    }
                    .cta-button:hover {
                        background-color: #e64a45;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Low Stock Alert</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${recipient},</p>
                        <p>We wanted to notify you that the stock level for the following product is running low:</p>
                        <div class="product-info">
                            <img src="\${productImageUrl}" alt="Product Image">
                            <div>
                                <h2>${product.name}</h2>
                            </div>
                        </div>
                        <div class="stock-level">
                            Current Stock Level: <strong>${product.quantity}</strong>
                        </div>
                        <a class="cta-button">Reorder Now</a>
                    </div>
                    <div class="footer">
                        <p>Thank you for using our inventory management system.</p>
                        <p>&copy; 2024 DE-Store Management. All rights reserved.</p>
                    </div>
                </div>
            </body>`
}
