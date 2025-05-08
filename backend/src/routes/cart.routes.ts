import express from 'express';
import { addToCart, getUserCart, updateCartItem } from '../controllers/cart.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/', protect, getUserCart);
router.patch("/:id", protect, updateCartItem);

export default router;