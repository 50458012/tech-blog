const koa = require('koa')
const app = koa()
const koaStrtic = require('koa-strtic');

const fs = require('fs');
const parth = require('path');
//  koa-body request body 解析
app.use(require('koa-body')())
const pro_dir = path.resolve(__dirname, '../', 'public')
app.use()
app.use(require('koa-views')(path.resolve('public/dist'), {
  default: 'pug',
  extension: 'pug',
  options: {
    pretty: false,
    debug: false,
    // compileDebug: false,
    // cache: options.viewsCache,
    basedir: options.viewsDir
  }
})); 