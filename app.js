
'use strict'
const app = new (require('koa'))()
const md = require('markdown-it')({
  html:         true,        // 在源码中启用 HTML 标签
  xhtmlOut:     true,        // 使用 '/' 来闭合单标签 （比如 <br />）这个选项只对完全的 CommonMark 模式兼容。
  breaks:       true,        // 转换段落里的 '\n' 到 <br>。
  langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify:      true,        // 将类似 URL 的文本自动转换为链接。启用一些语言中立的替换 + 引号美化
})
const fs = require('fs')
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
const markRender = viewName => Promise.resolve(md.render(
  fs.readFileSync(path.join(publicDir, 'md', viewName + '.md'), {
    encoding: 'utf-8'
  }
 ) || '404 找不到页面'))


const router = require('koa-router')() ;
router.get('*', async ctx => {
    const viewName = ctx.url.slice(ctx.url.lastIndexOf('/') + 1)
    
    console.log(ctx.path, 1111, ctx.url);
    const html = await markRender(viewName)
    console.log(html);
    // ctx.body = html
    // // return ctx.end(html)
    return ctx.render('layout', {html})
})
// 路由服务API
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => console.log('服务器已启动：http://localhost:3000/'))
