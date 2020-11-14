//添加数据模型模块，导出接口对象，给controller用
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/edu')

const advertSchema = mongoose.Schema({
    title: { type: String, required: true},
    image: { type: String, required: true},
    link: { type: String, required: true},
    start_time: {type:Date,required: true},
    end_time: {type:Date,required: true},
    create_time: { type: Date, default: Date.now},
    last_modified: { type: Date, default: Date.now},
})
//mongoose.model('Advert',advertSchema) 创建模型
const Advert = mongoose.model('Advert',advertSchema)
export default Advert
//mongoose.model('Advert') 获取已创建模型   mongoose.model('Advert') === Advert
//.skip(1).limit(1) 跳过一条取一条 =》 第二条数据


/*pageSize 3
页码 开始查询索引 查询个数
1       0       3
2       3       3
3       6       3
n   (n-1)*3     3
Advert
    .find()
    .skip(1)
    .limit(1)
    .exec((err,result)=>{
        if(err){
            throw err
        }
    })*/



