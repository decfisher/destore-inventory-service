import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { ProductDao } from './dao/ProductDao';
import { ProductController } from './controllers/ProductController';
import { ProductModel } from './models/product';
import { EmailController } from './controllers/EmailController';

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
const emailController = new EmailController({
  apiKey: process.env.SG_MAIL_API_KEY!,
  fromEmail: process.env.SG_MAIL_SENDER_ADDRESS!,
})
const productController = new ProductController(productDao, emailController);

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

// Routes
app.post('/create', productController.createProduct);

app.get('/all', productController.getAllProducts);

app.get('/find/:id', productController.findProductById);

app.patch('/add-stock', productController.addStock);

app.patch('/remove-stock', productController.removeStock);

app.patch('/adjust-stock', productController.adjustStock);

app.delete('/delete', productController.deleteProduct);

// Start the server
app.listen(port, () => {
  console.log(`🛜 Inventory service running on port ${port}...`);
});