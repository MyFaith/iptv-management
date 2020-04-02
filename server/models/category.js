import Mongoose from'mongoose';

const CategorySchema = new Mongoose.Schema({
    name: String,
    parent: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' }
});

Mongoose.model('category', CategorySchema, 'category');
