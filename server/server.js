const express = require('express')

const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

app.get('/', (request, response) => {
  response.send('hello')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})