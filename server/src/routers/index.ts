import Router from 'koa-router';
import Mongoose from 'mongoose';

const router = new Router();

/**
 * 获取列表
 */
router.get('/:resource', async ctx => {
    const resource = ctx.params.resource;

    const model = Mongoose.model(resource);
    const options = { populate: '' };
    if (resource === 'category') {
        options.populate = 'parent';
    } else if (resource === 'source') {
        options.populate = 'category';
    }
    const result = await model.find().setOptions(options);
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

export default router;
