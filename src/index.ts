import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProductDao } from './dao/ProductDao';
import { ProductController } from './controllers/ProductController';
import { ProductModel } from './models/product';

const SERVICE_NAME = 'DE_Store_Inventory';

// Get environment variables
const port = process.env.PORT || 3000;
const MONGO_DB_URI: string = process.env.DB_URI!;

// Connect to inventory database
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Connected to inventory database'))
  .catch(error => {
    console.log('❌ Failed to connect to inventory database');
    console.error(error);
  });

// Initialise data accessors
const productDao = new ProductDao(ProductModel);

// Initialise controllers
const productController = new ProductController(productDao);

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

// Routes
app.post('/products/add', productController.addProduct)

app.patch('/add-stock', async (req: Request, res: Response) => {
  const {
    id,
    quantity,
  } = req.body;

  try {
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        code: 404,
        service: SERVICE_NAME,
        route: '/add-stock',
        error: 'ProductModel not found',
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        code: 400,
        service: SERVICE_NAME,
        route: '/add-stock',
        error: 'Specifiy a quantity larger than 0',
      });
    }

    const updatedQuantity = product.quantity + quantity

    await product.updateOne({ quantity: updatedQuantity });

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/add-stock',
      product: {
        id: product._id,
        name: product.name,
        quantity: product.quantity,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/add-stock',
      error: 'Failed to update product stock',
    });
  }
});

app.patch('/remove-stock', async (req: Request, res: Response) => {
  const {
    id,
    quantity,
  } = req.body;

  try {
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        code: 404,
        service: SERVICE_NAME,
        route: '/remove-stock',
        error: 'ProductModel not found',
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        code: 400,
        service: SERVICE_NAME,
        route: '/remove-stock',
        error: 'Specifiy a quantity larger than 0',
      });
    }

    const updatedQuantity = product.quantity! - quantity

    if (updatedQuantity < 0) {
      return res.status(400).json({
        code: 400,
        service: SERVICE_NAME,
        route: '/remove-stock',
        error: 'Not enough stock',
      });
    }

    await product.updateOne({ quantity: updatedQuantity });

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/remove-stock',
      product: {
        id: product._id,
        name: product.name,
        quantity: product.quantity,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/remove-stock',
      error: 'Failed to update product stock',
    });
  }
});

app.get('/find/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        code: 404,
        service: SERVICE_NAME,
        route: '/find',
        error: 'ProductModel not found',
      });
    }

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/find',
      product: {
        id: product._id,
        name: product.name,
        quantity: product.quantity,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/find',
      error: 'Failed to find product',
    });
  }
});

app.get('/all', async (req: Request, res: Response) => {
  try {
    const result = await ProductModel.find();

    const products = result.map(record => {
      return {
        id: record._id,
        name: record.name,
        quantity: record.quantity,
        price: record.price,
        description: record.description,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      }
    });

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/all',
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/all',
      error: 'Failed to find products',
    });
  }
});

app.delete('/remove/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        code: 404,
        service: SERVICE_NAME,
        route: '/remove',
        error: 'ProductModel not found',
      });
    }

    await ProductModel.deleteOne({ _id: product.id });

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/all',
      message: 'Successfully deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      service: SERVICE_NAME,
      route: '/remove',
      error: 'Failed to remove product',
    });
  }
});

app.patch('/price/update', async (req: Request, res: Response) => {
  const { id, price } = req.body;

  try {
    const product = await ProductModel.findOneAndUpdate(
      { _id: id },
      {
          price: price,
          updatedAt: Date.now(),
      },
      { returnDocument: 'after', },
    );

    if (!product) {
      return res.status(404).json({
        code: 404,
        service: SERVICE_NAME,
        route: '/price/update',
        error: 'ProductModel not found',
      });
    }

    res.status(200).json({
      code: 200,
      service: SERVICE_NAME,
      route: '/price/update',
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
      route: '/price/update',
      error: 'Failed to update product price',
    });
  }
})

// Start the server
app.listen(port, () => {
  console.log(`🛜 Inventory service running on port ${port}...`);
});