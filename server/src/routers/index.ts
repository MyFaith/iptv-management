import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
    ctx.body = 'main';
});

/**
 * 获取列表
 */
router.get('/:resource', async ctx => {
    ctx.body = 'getList';
});

/**
 * 获取单个
 */
router.get('/:resource/:id', async ctx => {
    ctx.body = 'getOne';
});

/**
 * 保存
 */
router.post('/:resource', async ctx => {
    ctx.body = 'save';
});

/**
 * 更新
 */
router.put('/:resource/:id', async ctx => {
    ctx.body = 'update';
});

/**
 * 删除
 */
router.delete('/:resource/:id', async ctx => {
    ctx.body = 'delete';
});

export default router;
