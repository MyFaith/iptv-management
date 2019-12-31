const Mongoose = require('mongoose');

const SourceSchema = new Mongoose.Schema({
    name: String,
    category: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' },
    url: String,
    logo: String,
    type: Number
});

SourceSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

Mongoose.model('source', SourceSchema, 'source');
