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
                description: dbProduct.description,
                createdAt: dbProduct.createdAt,
                updatedAt: dbProduct.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}