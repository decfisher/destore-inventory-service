import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AddProductRequest, Product } from './models/product';

const SERVICE_NAME = 'DE_Store_Inventory';

// Get environment variables
const port = process.env.PORT || 3000;
const MONGO_DB_URI: string = process.env.DB_URI!;

// Connect to inventory database
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Connected to inventory database'))
  .catch(err => console.log(err));

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

// Routes
app.post('/products/add', async (req: Request<{}, {}, AddProductRequest, {}>, res: Response) => {
  const {
    name,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        code: 400,
        service: SERVICE_NAME,
        route: '/products/add',
        error: 'Name is required',
      });
    }

    const product = new Product({ 
      name,
    });

    await product.save();

    res.status(201).json({
      code: 201,
      service: SERVICE_NAME,
      route: '/products/add',
      product: {
        id: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/new',
      error: 'Failed to add product',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🛜 Inventory service running on port ${port}...`);
});