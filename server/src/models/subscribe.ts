import mongoose from 'mongoose';

export interface ISubscribe extends mongoose.Document {
    name: string;
    category?: string;
    url: string;
}

const SubscribeSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'category' },
    url: String
});

SubscribeSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

export const Subscribe: mongoose.Model<ISubscribe> = mongoose.model<ISubscribe>('subscribe', SubscribeSchema, 'subscribe');
