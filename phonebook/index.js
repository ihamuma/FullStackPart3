const express = require('express')
const app = express()

app.use(express.json())

let persons = [
      {
        name: "Ida Lovelace",
        number: "39-44-5323523",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      },
      {
        name: "Markus Ihamuotila",
        number: "0458931292",
        id: 5
      },
      {
        name: "Matti Meikäläinen",
        number: "04589213421",
        id: 6
      },
      {
        name: "Testing Person",
        number: "12345678910",
        id: 7
      }
    ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`)
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
      response.status(204).end
  })

  const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
      }

    persons = persons.concat(person)
    response.json(person)

  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })