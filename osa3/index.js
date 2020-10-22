const express = require('express')
const app = express()
const morgan = require('morgan')

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())

morgan.token('person', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content- length] - :response-time ms :person'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Rauno Repomies",
        number: "040-123-123"
    }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name and/or number cannot be empty' })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: createId(1, 10000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const createId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people </p>` + new Date())
})
