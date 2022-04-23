const http = require("http");
const express = require("express");
const { Socket } = require("socket.io");

const app = express();
const server = http.createServer(app)
const port = process.env.PORT || 80;
app.use(express.static(__dirname+ '/static'))
app.use('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})
//Socket Io setup startes here it will handle the socket io connections 
const io = require('socket.io')(server)
const users = {}

io.on("connection", (socket)=>{
    console.log(socket.id)
    // socket.on('new-user-joined', (name)=>{
    //     users[socket.id] = name;
    //     socket.broadcast.emit('user-joined', name)
    // })
    // socket.on('disconnect', ()=>{
    //     socket.broadcast.emit('user-disconnected', user=users[socket.id])
    //     delete users[socket.id]+
    // })
    socket.on('message', (data)=>{
        socket.broadcast.emit('message', {username : data.username, msg :  data.msg})
    })
})

server.listen(port, ()=>{
    console.log(`Your server has been succesfully started on ${port}`)
})
