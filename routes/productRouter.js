import express from 'express';
import { productController } from '../controllers';
const router = express.Router();

router.get('/:id', productController.getProductById);

export default router;