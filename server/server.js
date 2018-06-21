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
const { addUser, removeUser, getUser } = require('./utils/users')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected with ID ${socket.id}.`)

  socket.on('joinRoom', ({ username, room }, callback) => {
    try {
      addUser(username, room, socket.id)
      socket.join(room)
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
      socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${username} just joined the room.`))
    } catch (error) {
      callback(error.message)
    }
  })

  socket.on('createMessage', (text, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('newMessage', generateMessage(user.username, text))
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
    console.log(`Client with ID ${socket.id} disconnected.`)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})