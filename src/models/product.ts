import mongoose, { Document, model, Schema } from 'mongoose';

export interface AddProductRequest {
    name: string;
    quantity?: number;
    price?: number;
    description?: string;
}

export interface IProduct {
    name: string;
    quantity: number;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>(
    {
        name: { 
            type: String,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0.0,
        },
        description: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'products' },
);

export const ProductModel = model<IProductDocument>('Product', productSchema);