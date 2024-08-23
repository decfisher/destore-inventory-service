import { Model } from 'mongoose';
import { IProductDocument, Product } from '../models/product';

export class ProductDao {
    private model: Model<IProductDocument>

    constructor (model: Model<IProductDocument>) {
        this.model = model;
    }

    async create(name: string): Promise<Product> {
        try {
            if (!name) {
                throw new Error('Name is required');
            }

            const dbProduct = new this.model({
                name,
            });

            await dbProduct.save();

            return {
                id: (dbProduct._id as unknown) as string,
                name: dbProduct.name as string,
                quantity: dbProduct.quantity,
                price: dbProduct.price,
                discount: dbProduct.discount,
                createdAt: dbProduct.createdAt,
                updatedAt: dbProduct.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll(): Promise<Product[]> {
        try {
            const products = await this.model.find();

            return products.map((product) => ({
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findById(id: string): Promise<Product> {
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            const product = await this.model.findById(id);

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addStock(id: string, quantity: number): Promise<Product> {
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            if (!quantity) {
                throw new Error('Quantity is required');
            }

            if (quantity < 1) {
                throw new Error('Quantity must be greater than 0');
            }

            const product = await this.model.findOneAndUpdate(
                { _id: id },
                { $inc: { quantity: quantity }, updatedAt: new Date(), },
                { returnDocument: 'after' },
            );

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async adjustStock(id: string, quantity: number): Promise<Product> {
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            if (!quantity) {
                throw new Error('Quantity is required');
            }

            const product = await this.model.findOne({ _id: id, });

            if (!product) {
                throw new Error('Product not found');
            }

            // Chceck stock will not go below zero
            if (product.quantity + quantity < 0) {
                throw new Error('Insufficient stock');
            }

            const date = new Date();

            await product.updateOne({ $inc: { quantity: quantity }, updatedAt: date, });

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity + quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: date,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async removeStock(id: string, quantity: number): Promise<Product> {
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            if (!quantity) {
                throw new Error('Quantity is required');
            }

            if (quantity < 1) {
                throw new Error('Quantity must be greater than 0');
            }

            const product = await this.model.findOneAndUpdate(
                { _id: id },
                { $inc: { quantity: -quantity }, updatedAt: new Date(), },
                { returnDocument: 'after' },
            );

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const product = await this.model.findByIdAndDelete(id);

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}