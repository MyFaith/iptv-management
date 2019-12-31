const Router = require('koa-router');
const Mongoose = require('mongoose');
const Axios = require('axios');
const PlaylistParser = require('iptv-playlist-parser');
const Response = require('../util/response');

const router = new Router();

/* 自定义路由START */
router.post('/subscribe/refresh/:id', async ctx => {
    const id = ctx.params.id;
    const subscribeModel = Mongoose.model('subscribe');
    const source = await subscribeModel.findById(id);
    if (!source) {
        ctx.body = Response.error(404, '该ID不存在');
    }
    // 获取列表数据
    const res = await Axios.get(source.url);
    // 解析数据
    const playlist = PlaylistParser.parse(res.data);
    // 保存到数据库
    const dataList = [];
    playlist.items.map(item => {
        dataList.push({
            name: item.name,
            category: source.category._id.toString(),
            url: item.url
        });
    });
    const sourceModel = Mongoose.model('source');
    const result = await sourceModel.insertMany(dataList);
    ctx.body = result;
});
/* 自定义路由END */

/* 通用路由START */
/**
 * 获取列表
 */
router.get('/:resource', async ctx => {
    const resource = ctx.params.resource;
    const page = ctx.query.page || 1;
    const size = ctx.query.page || 10;

    const model = Mongoose.model(resource);
    const options = { populate: '' };
    if (resource === 'category') {
        options.populate = 'parent';
    } else if (resource === 'source' || resource === 'subscribe') {
        options.populate = 'category';
    }
    const result = await model.find().setOptions(options).skip((page - 1) * size).limit(size);
    ctx.body = result;
});

/**
 * 获取单个
 */
router.get('/:resource/:id', async ctx => {
    const resource = ctx.params.resource;
    const id = ctx.params.id;

    const model = Mongoose.model(resource);
    const result = await model.findById(id);
    ctx.body = result;
});

/**
 * 保存
 */
router.post('/:resource', async ctx => {
    const resource = ctx.params.resource;

    const model = Mongoose.model(resource);
    const result = await model.insertMany(ctx.request.body);
    ctx.body = result;
});

/**
 * 更新
 */
router.put('/:resource/:id', async ctx => {
    const resource = ctx.params.resource;
    const id = ctx.params.id;

    const model = Mongoose.model(resource);
    const result = await model.updateOne({ _id: id }, { $set: ctx.request.body });
    ctx.body = result;
});

/**
 * 删除
 */
router.delete('/:resource/:id', async ctx => {
    const resource = ctx.params.resource;
    const id = ctx.params.id;

    const model = Mongoose.model(resource);
    const result = await model.deleteOne({ _id: id });
    ctx.body = result;
});
/* 通用路由END */

module.exports = router;
