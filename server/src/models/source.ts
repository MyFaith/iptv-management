import mongoose from 'mongoose';

export interface ISource extends mongoose.Document {
    name: string;
    category?: string;
    url: string;
}

const SourceSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'category' },
    url: String
});

SourceSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

export const Category: mongoose.Model<ISource> = mongoose.model<ISource>('source', SourceSchema, 'source');
