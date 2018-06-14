const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

const _filter = {'pwd':0,'_v':0}
// Chat.remove({},function(e,d){})

Router.get('/info',function(req,res){
    //cookie读是在req，写是在res
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log(doc)
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        // 使用简单的json.dumps方法对简单数据类型进行编码
        return res.json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        //Object.assign 浅拷贝、对象属性的合并
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1, msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.get('/list',function(req,res){
    // User.remove({},function(e,d){})
    const {type} = req.query
    User.find({type},function(err,doc){
        return res.json({code:0, data:doc})
    })
})

Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid
    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user, avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})

//密码加严
function md5pwd(pwd){
    const salt = 'hello_world_nono@1325'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router