let users = {

}

class User {
  constructor(username, room, socketId) {
    this.username = username
    this.room = room,
    this.socketId = socketId
  }
}

function isValidString(toTest) {
  return typeof(toTest) === 'string' && toTest.trim().length > 0 
}

const addUser = (username, room, socketId) => {
  if (!isValidString(username) || !isValidString(room)) throw new Error('A username and room name is required.')
  users[socketId] = new User(username, room, socketId)
  console.log(users)
}

const removeUser = (socketId) => {
  delete users[socketId]
  console.log(users)
}

const getUser = (socketId) => {
  return users[socketId]
}

// getUsernamesInRoom(room)

module.exports = {
  addUser,
  removeUser,
  getUser
}