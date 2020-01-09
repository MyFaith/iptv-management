import Mongoose from 'mongoose';

const SubscribeSchema = new Mongoose.Schema({
    name: String,
    category: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' },
    url: String
});

SubscribeSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

Mongoose.model('subscribe', SubscribeSchema, 'subscribe');
