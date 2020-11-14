import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/edu'

export default (errLog, req, res, next) => {
    //打开连接
    MongoClient.connect(url, (err, db) => {
        db.collect('error_logs')
            .insertOne({
                name: errLog.name,
                message: errLog.message,
                stack: errLog.stack,
                time: new Date()
            },(err,result)=>{
                res.json({
                    err_code: 500,
                    message: errLog.message
                })
            })
        //关闭数据库
        db.close()
    })
}
