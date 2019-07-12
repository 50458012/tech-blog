
'use strict'
const app = new (require('koa'))()

const path = require('path')
// 静态资源部署
const publicDir = path.join(__dirname, 'public') 
app.use(require('koa-static')(publicDir))
//  koa-body request body 解析
// app.use(require('koa-body')())
// 网页模板引擎
 app.use(require('koa-views')(path.join(publicDir, 'template'), {
  default: 'pug',
  extension: 'pug',
  options: {
    pretty: false,
    debug: false,
    // compileDebug: false,
    // cache: options.viewsCache,
    // basedir: path.join(publicDir, 'template')
  }
})); 
const router = require('koa-router')() ;
router.get('*', ctx => {
    const viewName = ctx.url.slice(ctx.url.lastIndexOf('/') + 1)

    console.log(ctx.path, 1111, ctx.url);
    
    return ctx.render('layout', {view: path.join(publicDir, 'md', viewName + '.md')})
})
// 路由服务API
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => console.log('服务器已启动：http://localhost:3000/'))
