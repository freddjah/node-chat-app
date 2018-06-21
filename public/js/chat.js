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
    
    socket.emit('createMessage', {
      from: 'User',
      text: input
    }, function() {
      
    })
})