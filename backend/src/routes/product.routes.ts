import express from 'express';
import {
    addProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';
import { protect } from '../middlewares/protect';
import multer from 'multer';

// Configure multer for image uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

// Protected routes (requires user auth)
router.post('/addproduct', protect, upload.single('image'), addProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
