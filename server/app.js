const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Cors = require('koa-cors');
const Mongoose = require('mongoose');
const Config = require('./config');
const routers = require('./routers');
require('./models');

// Init mongodb
Mongoose.connect(Config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Koa();
app.use(BodyParser());
app.use(Cors());
app.use(routers.routes());

app.listen(8004, () => {
    console.log('Started => http://localhost:8004');
});
