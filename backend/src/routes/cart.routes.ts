import express from 'express';
import { addToCart, getUserCart } from '../controllers/cart.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/', protect, getUserCart);

export default router;