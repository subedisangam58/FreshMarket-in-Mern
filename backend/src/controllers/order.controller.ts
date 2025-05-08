import { Request, Response } from 'express';
import Order from '../models/order';
import { IUser } from '../models/user';
import Cart from '../models/cart';

// Extend Express Request to include req.user
interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const order = new Order({
            ...req.body,
            user: req.user._id,
        });

        await order.save();

        // ✅ Clear the user's cart after successful order
        await Cart.deleteMany({ user: req.user._id });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order,
        });
    } catch (error: any) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message || 'Failed to create order' });
    }
};


export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('products.product');

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error: any) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message || 'Failed to fetch orders' });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user')
            .populate('products.product');

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error: any) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: error.message || 'Failed to fetch order' });
    }
};

export const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId }).populate('products.product');

        res.status(200).json({
            success: true,
            orders, // could be empty [], which is okay
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Failed to fetch user orders' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated',
            order,
        });
    } catch (error: any) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: error.message || 'Failed to update order status' });
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: error.message || 'Failed to delete order' });
    }
};
