var socket = io()

socket.on('connect', function() {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (payload) {
  let li = document.createElement('li')
  li.innerText = `${payload.from}: ${payload.text}`

  document.getElementById('messageList').appendChild(li)
})

document
  .getElementById('messageForm')
  .addEventListener('submit', function(event) {
    event.preventDefault()

    const input = document
                    .getElementById('messageForm')
                    .getElementsByTagName('input')[0]
                    .value
    
    socket.emit('createMessage', input, function() {
      
    })
})


// Join room

const params = new URLSearchParams(document.location.search)
const username = params.get('username')
const room = params.get('chatroom')

document.getElementById('username').innerText = username
document.getElementById('chatroomName').innerText = room

socket.emit('joinRoom', { username, room }, (error) => {
  if (error) {
    alert(error)
    document.location.href = '/'
  }
})