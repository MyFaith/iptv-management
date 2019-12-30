import Koa from 'koa';
import Router from 'koa-router';
import Mongoose from 'mongoose';
import Config from './config';

// Init mongodb
Mongoose.connect(Config.MONGODB_URL);