import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    user: mongoose.Types.ObjectId;
}

const cartSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<ICartItem>('Cart', cartSchema);