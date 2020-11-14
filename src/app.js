import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import bodyParser from './middlewares/body-parser'
import errLog from './middlewares/error-log'
//路由分发
import indexRouter from './routes/index'
import advertRouter from './routes/advert'

const app = express();

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//用nunjucks渲染，后缀名需要一致
//配置使用nunjucks模板引擎
//noCatch 禁用缓存
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
})

/*app.set('views',config.viewPath)
app.set('view engine','ejs')

app.get('/',(req,res) =>{
    res.render('index')
})*/

//解析处理表单 post 请求体中间件
app.use(bodyParser)

//挂载路由容器
app.use(indexRouter)
app.use(advertRouter)


app.listen(3000, () => {
    console.log('server is running.....')
})
