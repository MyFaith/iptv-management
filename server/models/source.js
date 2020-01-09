import Mongoose from 'mongoose';

const SourceSchema = new Mongoose.Schema({
    name: String,
    category: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' },
    url: String,
    logo: String,
    type: Number // 类型, 1=手动添加, 2=订阅源, 3=直播平台
});

SourceSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

Mongoose.model('source', SourceSchema, 'source');
