import { Request, Response, NextFunction } from 'express';
import { ProductDao } from '../dao/ProductDao';
import { EmailController } from './EmailController';
import lowStockEmailBody from '../util/LowStockEmailTemplate';

export class ProductController {
    private productDao: ProductDao;
    private emailController: EmailController;

    constructor (productDao: ProductDao, emailController: EmailController) {
        this.productDao = productDao;
        this.emailController = emailController;
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

    adjustStock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, quantity } = req.body;
            const product = await this.productDao.adjustStock(id, quantity);

            if (product.quantity < 10) {
                this.emailController.sendEmail(
                    'dfisher.contact@gmail.com',
                    '[ALERT] A product in your inventory has been flagged as low stock',
                    lowStockEmailBody('{recipient_name}', product),
                );
            }

            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}