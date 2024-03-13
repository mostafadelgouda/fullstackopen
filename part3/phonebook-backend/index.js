const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
    //response.json(persons)
  })
  //response.send(`<p>Phonebook has info for ${data.length} people</p><p>${new Date()}</p>`);

})
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(result => {
    response.send(result)
  })
  
  // const ret = data.find(item => item.id === id)
  // if(ret)
  //     response.send(ret)
  // else
  //     response.status(404).end()
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const updatedPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  //console.log("ana hena ya jhobne")
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    response.json(result)
  }).catch(error => {
    next(error)
  })
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(errorHandler)
app.use(unknownEndpoint)