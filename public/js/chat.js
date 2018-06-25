var socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('addUser', function (user) {
  let li = document.createElement('li')
  li.innerText = `${user}`
  li.classList.add('list-group-item')

  document.getElementById('usersList').appendChild(li)
})

socket.on('removeUser', function (user) {
  const userList = document.getElementById('usersList')

  usersList.childNodes.forEach(function (li) {
    if (li.innerText === user) userList.removeChild(li)
  })
})

socket.on('newMessage', function (payload) {
  let li = document.createElement('li')
  li.innerText = `${payload.createdAt} - ${payload.from}: ${payload.text}`
  li.classList.add('list-group-item')

  document.getElementById('messageList').appendChild(li)
})

document
  .getElementById('messageForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const inputField = document
                    .getElementById('messageForm')
                    .getElementsByTagName('input')[0]
    
    socket.emit('createMessage', inputField.value, function() {
      
    })

    inputField.value = ''
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