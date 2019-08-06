require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function (req, res) {
  res.json('get Usuario')
})

app.post('/usuario', function (req, res) {
  let persona = req.body
  res.json({
    persona
  })
})

app.put('/usuario/:id', function (req, res) {
  let id = req.params.id
  res.json({
    id
  })
})

app.delete('/usuario', function (req, res) {
  res.json('DELETE Usuario')
})

app.listen(process.env.PORT, () => {
  console.log(`Listen port ${process.env.PORT}`)
})