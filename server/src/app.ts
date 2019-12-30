import Koa from 'koa';
import Router from 'koa-router';
import Mongoose from 'mongoose';
import Config from './config';
import routers from './routers';
import './models';

// Init mongodb
Mongoose.connect(Config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Koa();
const router = new Router();
router.use(routers.routes());

app.listen(8004, () => {
    console.log('Started => http://localhost:8004');
});
