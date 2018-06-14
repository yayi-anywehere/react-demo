const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
       const {from,to,msg} = data
       const chatid = [from,to].sort().join('_')
       Chat.create({chatid,from,to,content:msg},function(err,doc){
           io.emit('recvmsg', Object.assign({},doc._doc))
       })
   })
})

app.use(cookieParser())
//可以解析post 过来的json 数据
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
    console.log('Node start at 9093')
})