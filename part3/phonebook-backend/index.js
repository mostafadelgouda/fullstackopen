const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001
require('dotenv').config()


const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${data.length} people</p><p>${new Date()}</p>`);

})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const ret = data.find(item => item.id === id)
    if(ret)
        response.send(ret)
    else
        response.status(404).end()
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(item => item.id !== id)
    response.status(204).end()
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {})
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})