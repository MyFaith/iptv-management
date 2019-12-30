import mongoose from 'mongoose';

interface ICategory extends mongoose.Document {
    name: string,
    parent?: string,
    created: Date,
    updated: Date
}

const CategorySchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    parent: String,
    created: Date,
    updated: Date
});

CategorySchema.pre('save', function(next) {
    const now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

CategorySchema.pre('update', function(next) {
    const now = new Date();
    if (!this.updated) {
        this.updated = now;
    }
    next();
});

export const Category: mongoose.Model<ICategory> = mongoose.model<ICategory>('category', CategorySchema, 'category');