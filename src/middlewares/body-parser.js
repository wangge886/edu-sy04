
import querystring from 'querystring'

export default (req,res,next) =>{
    if(req.method.toLowerCase() === 'get'){
        //console.log('进入 body-parser 了')
        return next()
    }
    //普通表单 post ，自己处理
    //有文件的表单 post， 跳过不处理
    if(req.headers['content-type'].startsWith('multipart/form-data')){
        return next()
    }

    let data = ''
    req.on('data',chunk =>{
        data += chunk
    })
    req.on('end', ()=>{
        //手动给request 对象挂载一个 body属性
        //在后续的处理中间件中，可以直接使用 req.body ,在同一个请求中，是同一个 req 和 res
        req.body = querystring.parse(data)
        // console.log(data)
        next()
    })
}
