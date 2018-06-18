const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected with ID ${socket.id}.`)

  socket.on('disconnect', () => {
    console.log(`Client with ID ${socket.id} disconnected.`)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})