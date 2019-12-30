import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    parent?: string,
    created: Date,
    updated: Date
}

const CategorySchema: mongoose.Schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    parent: String,
    created: Date,
    updated: Date
});

CategorySchema.pre<ICategory>('save', function(next) {
    const now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

CategorySchema.pre<ICategory>('update', function(next) {
    const now = new Date();
    if (!this.updated) {
        this.updated = now;
    }
    next();
});

export const Category: mongoose.Model<ICategory> = mongoose.model<ICategory>('category', CategorySchema, 'category');