import Mongoose from'mongoose';

const CategorySchema = new Mongoose.Schema({
    name: String,
    parent: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' }
});

CategorySchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'category'
});

Mongoose.model('category', CategorySchema, 'category');
