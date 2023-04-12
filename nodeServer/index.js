const { createServer } = require("http");
const httpServer = createServer();
const io = require('socket.io')(8080,{
    cors:{
        origin:'http://127.0.0.1:5500',
        method:['GET','POST']

    }
});
const users={};
io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
        console.log("Welcome",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', {name})
    })

    socket.on('send',(message)=>{
       socket.broadcast.emit('receive',{message,name:users[socket.id]}); 
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id];
    })
})
