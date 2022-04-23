const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

app.use(bodyParser.json())
  
app.get('/', (req, res) => {
  res.send(JSON.stringify({ data: 'Hello World!' }))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

