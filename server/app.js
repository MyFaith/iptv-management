import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Cors from 'koa-cors';
import Mongoose from 'mongoose';
import Config from './config.js';
import routers from './routers/index.js';
import './models/index.js';

// Init mongodb
Mongoose.connect(Config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Koa();
app.use(BodyParser());
app.use(Cors());
app.use(routers.routes());

app.listen(8004, () => {
    console.log('Started => http://localhost:8004');
});
