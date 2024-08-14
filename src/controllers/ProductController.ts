import { Request, Response, NextFunction } from 'express';
import { ProductDao } from '../dao/ProductDao';
import { AddProductRequest } from '../models/product';

export class ProductController {
    private productDao: ProductDao;

    constructor (productDao: ProductDao) {
        this.productDao = productDao;
    }

    addProduct = async (req: Request<{}, {}, AddProductRequest, {}>, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;
            const product = await this.productDao.create(name);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }
}