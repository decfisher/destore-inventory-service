import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
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

export const Product = mongoose.model('Product', ProductSchema);

export interface AddProductRequest {
    name: string;
    quantity?: number;
    price?: number;
    description?: string;
}