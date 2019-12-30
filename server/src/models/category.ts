import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
    name: string;
    parent?: string;
}

const CategorySchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'category' },
});

CategorySchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'category'
});

export const Category: mongoose.Model<ICategory> = mongoose.model<ICategory>('category', CategorySchema, 'category');
