const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const { generateMessage } = require('./utils/message')  

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected with ID ${socket.id}.`)

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'))

  socket.on('createMessage', ({ from, text }) => {
    io.emit('newMessage', generateMessage(from, text))
  })

  socket.on('disconnect', () => {
    console.log(`Client with ID ${socket.id} disconnected.`)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})