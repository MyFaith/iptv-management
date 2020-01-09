import Mongoose from 'mongoose';

const CrawlSchema = new Mongoose.Schema({
    name: String,
    category: { type: Mongoose.SchemaTypes.ObjectId, ref: 'category' },
    platform: Number, // 平台, 1=斗鱼, 2=虎牙, 3=战旗
    url: String
});

CrawlSchema.virtual('parent', {
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    ref: 'category'
});

Mongoose.model('crawl', CrawlSchema, 'crawl');
