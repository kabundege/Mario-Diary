import http from 'http'
import app from './app';
import dotenv from 'dotenv';
import socket from 'socket.io'

dotenv.config();

const httpServer =  http.createServer(app)

const port = process.env.PORT || 5050;

const server = httpServer.listen(port,()=>{
    console.log(` You are running port ${port}....`)
});

const io = socket(server)

io.on('connection',(socket)=>{
    console.log('a user connected')
    
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})
