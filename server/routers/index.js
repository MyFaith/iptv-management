import Router from'koa-router';
import Mongoose from'mongoose';
import Axios from'axios';
import PlaylistParser from'iptv-playlist-parser';
import * as Response from'../util/response.js';

const router = new Router();

/* ---------------------------------------------自定义路由START--------------------------------------------- */
/**
 * 直播源批量移动分类
 */
router.post('/migrateCategory', async ctx => {
    try {
        const params = ctx.request.body;
        const sourceModel = Mongoose.model('source');
        
        const result = await sourceModel.updateMany({ _id: { $in: params.ids } }, { category: params.to });
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 导入直播源
 */
router.post('/importSource', async ctx => {
    try {
        const params = ctx.request.body;
        const sourceModel = Mongoose.model('source');
        
        let content = '';
        const dataList = [];
        if (params.importType === 1) {
            // 从URL导入
            const res = await Axios.get(params.url);
            content = res.data;
        } else if (params.importType === 2) {
            // 从M3U文件导入
            content = params.m3uContent;
        } else {
            ctx.body = Response.error(500, '导入类型错误');
        }
        // 解析数据
        const playlist = PlaylistParser.parse(content);
        // 循环存储到source表
        playlist.items.map(item => {
            dataList.push({
                name: item.name,
                category: params.category,
                url: item.url,
                logo: item.tvg.logo,
                groupTitle: item.group.title,
                type: 2 // 导入直播源
            });
        });
        const result = await sourceModel.insertMany(dataList);
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 抓取平台直播源
 */
router.post('/crawl/crawlSource', async ctx => {
    try {
        const id = ctx.request.body.id;
        const crawlModel = Mongoose.model('crawl');
        let crawlList = [];
        if (id) {
            // 单个
            const crawl = await crawlModel.findById(id);
            if (!crawl) {
                ctx.body = Response.error(404, '该ID不存在');
            }
            crawlList.push(crawl);
        } else {
            // 全部
            crawlList = await crawlModel.find();
        }
        // 解析
        const sourceModel = Mongoose.model('source');
        crawlList.map(async item => {
            if (item.platform === 1) {
                const html = await Axios.get(item.url);
                const m3u8 = html.data.match(/var streamUrl = "(.+)";/);
                const logo = html.data.match(/\$ROOM\.owner_avatar ="(.+)";/);
                await sourceModel.updateOne({ name: item.name }, {
                    name: item.name,
                    category: item.category,
                    url: m3u8[1],
                    logo: logo[1],
                    groupTitle: '斗鱼',
                    type: 3
                }, { upsert: true });
            } else if (item.platform === 2) {
                const html = await Axios.get(item.url);
                let streamInfo = html.data.match(/"stream":(.*)\};/)[1];
                streamInfo = JSON.parse(streamInfo).data[0];
                await sourceModel.updateOne({ name: item.name }, {
                    name: item.name,
                    category: item.category,
                    url: `${streamInfo.gameStreamInfoList[0].sHlsUrl}/${streamInfo.gameStreamInfoList[0].sStreamName}.${streamInfo.gameStreamInfoList[0].sHlsUrlSuffix}`.trim(),
                    logo: streamInfo.gameLiveInfo.avatar180,
                    groupTitle: '虎牙',
                    type: 3
                }, { upsert: true });
            } else if (item.platform === 3) {
                ctx.body = Response.error(500, '正在对接中');
            }
        });
        ctx.body = Response.success('成功', null);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});
/* ---------------------------------------------自定义路由END--------------------------------------------- */

/* ---------------------------------------------通用路由START--------------------------------------------- */
/**
 * 获取列表
 */
router.get('/:resource', async ctx => {
    try {
        const resource = ctx. params.resource;
        const page = ctx.query.page || 1;
        const size = ctx.query.size || 10;

        // mongodb查询条件
        let query = { $and: [] };
        Object.keys(ctx.query).map(key => {
            if (key !== 'page' && key !== 'size') {
                const value = ctx.query[key];
                if (value) {
                    if (key === 'category') {
                        const obj = {
                            category: value
                        };
                        query.$and.push(obj);
                    } else {
                        const obj = {};
                        obj[key] = {
                            $regex: new RegExp(value, 'i')
                        };
                        query.$and.push(obj);
                    }
                }
            }
        });
    
        const model = Mongoose.model(resource);
        const options = { populate: '' };
        if (resource === 'category') {
            options.populate = 'parent';
        } else if (resource === 'source' || resource === 'subscribe' || resource === 'crawl') {
            options.populate = 'category';
        }
        // 如果没有条件, 清空条件对象
        if (query.$and.length === 0) query = {};
        const total = await await model.find(query).setOptions(options).count();
        let result = [];
        if (page !== 0 && size !== 0) {
            result = await model.find(query).setOptions(options).skip((Number(page) - 1) * Number(size)).limit(Number(size));
        } else {
            result = await model.find(query).setOptions(options);
        }
        ctx.body = Response.success('成功', {
            total,
            list: result
        });
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 获取单个
 */
router.get('/:resource/:id', async ctx => {
    try {
        const resource = ctx.params.resource;
        const id = ctx.params.id;
    
        const model = Mongoose.model(resource);
        const result = await model.findById(id);
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 保存
 */
router.post('/:resource', async ctx => {
    try {
        const resource = ctx.params.resource;
    
        const model = Mongoose.model(resource);
        const result = await model.insertMany(ctx.request.body);
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 更新
 */
router.put('/:resource/:id', async ctx => {
    try {
        const resource = ctx.params.resource;
        const id = ctx.params.id;
    
        const model = Mongoose.model(resource);
        const result = await model.updateOne({ _id: id }, { $set: ctx.request.body });
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});

/**
 * 删除
 */
router.delete('/:resource/:id', async ctx => {
    try {
        const resource = ctx.params.resource;
        const id = ctx.params.id;
    
        let result = '', ids = [];
        const model = Mongoose.model(resource);
        if (id.includes(',')) {
            ids = id.split(',');
            result = await model.deleteMany({ _id: { $in: ids } });
        } else {
            result = await model.deleteOne({ _id: id });
        }
        ctx.body = Response.success('成功', result);
    } catch (err) {
        ctx.body = Response.error(500, '服务端错误');
    }
});
/* ---------------------------------------------通用路由END--------------------------------------------- */

export default router;
