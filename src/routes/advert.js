/*
* 广告路由
* */

import express from 'express'

const router = express.Router()
import formidable from 'formidable'
import config from '../config'
import {basename} from 'path'
//导入模型
import Advert from '../modules/advert'

router.get('/advert', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10)
    const pageSize = 5
    Advert
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                return next(err)
            }
            Advert.count((err, count) => {
                if (err) {
                    return next(err)
                }
                //总页码
                const totalPage = Math.ceil(count / pageSize)
                res.render('advert_list.html', {
                    adverts,
                    totalPage,
                    page})
            })
        })
})
router.get('/advert/add', (req, res, next) => {
    res.render('advert_add.html')
})

/*
    post  /advert/add
*   body{ title,image,link,start_time,end_time }
* */
router.post('/advert/add', (req, res, next) => {
    //接收表单数据
    // const body = req.body;
    const form = new formidable.IncomingForm()
    form.uploadDir = config.uploadDir //配置文件上传路径
    form.keepExtensions = true // 保持文件原始扩展名
    //fields 表单中普通字段
    //files 上传的文件信息，文件大小，路径
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err)
        }
        const body = fields
        body.image = basename(files.image.path)
        //吧 files 里面的图片处理一下
        //在body中，添加一个image ，就是图片上传路径
        //console.log(body)
        //操作数据库
        const advert = new Advert({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time,
        })
        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })
})
//查询所有
router.get('/advert/list', (req, res, next) => {
    Advert.find((err, docs) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs
        })
        console.log(1)

    })
})
//更新 1
//根据id查询一个
//   /advert/one/:advertId 模糊匹配路径
router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})
//更新 2
router.post('/advert/edit', (req, res, next) => {
    Advert.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        const body = req.body;
        advert.title = body.title;
        advert.image = body.image;
        advert.link = body.link;
        advert.start_time = body.start_time;
        advert.end_time = body.end_time;
        advert.last_modified = Date.now()

        // save 因为内部有一个 _id ，这里不会新增数据，而是更新数据
        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })
})

//删除
router.get('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({_id: req.params.advertId}, (err) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
})
//通过 export default 暴露的接口成员不能定义的同时直接暴露
//先定义，再暴露
export default router
