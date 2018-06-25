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
const { addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected with ID ${socket.id}.`)

  socket.on('joinRoom', ({ username, room }, callback) => {   
    try {
      // Add user
      addUser(username, room, socket.id)
      socket.join(room)

      // Welcome user.
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))

      // Alert others that a new user has joined.
      socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${username} just joined the room.`))

      // Ask others to add user to their list of current users in the room.
      socket.broadcast.to(room).emit('addUser', username)

      // Current user should also add all users to his list.
      getUsersInRoom(room).forEach(user => {
        socket.emit('addUser', user)
      })
    } catch (error) {
      callback(error.message)
    }
  })

  socket.on('createMessage', (text, callback) => {
    const user = getUser(socket.id)

    console.log(user)

    io.to(user.room).emit('newMessage', generateMessage(user.username, text))
  })

  socket.on('disconnect', () => {
    let user = getUser(socket.id)

    if (!user) return
    
    socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.username} left the room.`))
    // Ask others to remove user from their list of current users in the room.
    socket.to(user.room).emit('removeUser', user.username)

    removeUser(socket.id)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})