const mongoose = require('mongoose')
//链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})

//schema
const models = {
    user:{
        'user':{type:String, 'require':true},
        'pwd':{type:String, 'require':true},
        'type':{type:String, 'require':true},
        //头像
        'avatar':{type:String},
        //职位简介
        'desc':{type:String},
        //职位名
        'title':{type: String},
        //boss 还有两个字段
        'company':{type: String},
        'money':{type: String}
    },
    chat:{
        'chatid':{'type':String, 'require':true},
        'from':{'type':String, 'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time': {'type': Number, 'default':new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}