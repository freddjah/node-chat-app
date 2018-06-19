var socket = io()

socket.on('connect', function() {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (payload) {
  console.log(payload)
})