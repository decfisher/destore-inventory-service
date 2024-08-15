import { Request, Response, NextFunction } from 'express';
import { ProductDao } from '../dao/ProductDao';
import { AddProductRequest } from '../models/product';

export class ProductController {
    private productDao: ProductDao;

    constructor (productDao: ProductDao) {
        this.productDao = productDao;
    }

    createProduct = async (req: Request<{}, {}, AddProductRequest, {}>, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;
            const product = await this.productDao.create(name);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productDao.getAll();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    findProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await this.productDao.findById(id);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const product = await this.productDao.delete(id);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    addStock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, quantity } = req.body;
            const product = await this.productDao.addStock(id, quantity);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    removeStock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, quantity } = req.body;
            const product = await this.productDao.removeStock(id, quantity);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}