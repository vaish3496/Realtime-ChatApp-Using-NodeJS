const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.port || 8800

users = {}

app.use(express.static(__dirname+'/views'))


app.get('/', (req,res) =>{
    res.render('index')
})

io.sockets.on('connection',socket => {
    socket.on('new-user',(data,callback) =>{
        if(Object.values(users).indexOf(data) > -1){
            callback(false)
        }else{
            callback(true)
            users[socket.id] = data
            io.sockets.emit('users',users)
        }
    })

    socket.on('new-message',(data,callback) =>{
        if(data.length == 0){
            callback(false)
        }else{
            callback(true)
            io.sockets.emit('send-new-message',{msg : data, username : users[socket.id]})
        }
    })

    socket.on('disconnect',() =>{
        delete users[socket.id]
        io.sockets.emit('users',users)
    })
})

server.listen(port)


