const express = require('express')
const app = express()
let persons = [
    {
        id: 1,
        name: "Seth McCann",
        number: "201-965-5659"
    },
    {
        id: 2,
        name: "Daniela Ramirez",
        number: "201-450-0274"
    },
    {
        id: 3,
        name: "Gaby McCann",
        number: "201-123-1234"
    },
    {
        id: 4,
        name: "Dad",
        number: "201-987-6543"
    }
]

const morgan = require('morgan')
morgan.token('type', function(req, res) {
    return JSON.stringify(req.body);
})
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['type'](req, res)
    ].join(' ')
}))

app.get('/', (request, response) => {
    response.send('<h1>HELLO BOYYY!</h1>')
})

 app.get('/api/persons', (request, response) => {
     response.json(persons)
 })

 app.get('/api/persons/:id', (request, response) => {
     const id = Number(request.params.id)
     const info = persons.find(person => person.id === id)
     response.json(info)
 })

 app.delete('/api/persons/:id', (request, response) => {
     const id = Number(request.params.id)
     persons = persons.filter(person => person.id !== id)
     response.status(204).end()
 })

 app.get('/info', (request, response) => {
    let date = new Date();
     response.send(
         `
         <p>Phonebook has info for for ${persons.length} people</p>
         <p>${date}</p>
         `
     );
 })

 app.post('/api/persons', (request, response) => {
     const body = request.body
     if (!body || !body.number) {
         return response.status(400).json({
             error: 'content missing'
         })
     }
     const exists = persons.find(person => person.name === body.name)
     if (exists) {
         return response.status(400).json({
             error: 'duplicate name'
         })
     }
     const id = Math.floor(Math.random() * 1000)
     const person = {
         id: id,
         name: body.name,
         number: body.number
     }
     persons = persons.concat(person)
     response.json(person)
 })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})