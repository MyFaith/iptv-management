import Koa from 'koa';
import Mongoose from 'mongoose';
import Config from './config';
import routers from './routers';
import './models';

// Init mongodb
Mongoose.connect(Config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Koa();
app.use(routers.routes());

app.listen(8004, () => {
    console.log('Started => http://localhost:8004');
});
