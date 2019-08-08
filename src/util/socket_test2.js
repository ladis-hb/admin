const  io = require('socket.io-client')
const socket = io('http://127.0.0.1:3000')

socket.emit('registerRoom',{room:'admin'})

socket.on('newDevs',data=>{
    console.log(data)
})
