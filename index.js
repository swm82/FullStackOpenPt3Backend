// require() includes the modules
// dotenv import must come first 
require('dotenv').config()
const express = require('express')
const app = express()
// import model
const Person = require('./models/person')
const morgan = require('morgan')
morgan.token('type', function(req, res) {
    return JSON.stringify(req.body);
})
const cors = require('cors')

// Middleware: functions with access to req obj (req), response obj (res) and the next middleware in req-resp cycle
// can execute code, change req/res objects, end cycle, call next middleware function on stack
// it must call next() to pass control, else it hangs
// middleware ordering is critical.  If middleware depends on availability it must proceed the middleware it depends on
// middle ware is called in the order it is "use"'ed
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

// Endpoints
app.get('/', (request, response) => {
    response.send('<h1>HELLO BOYYY!</h1>')
})

 app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log(persons)
        response.json(persons)
    })
 })

 // Must pass next as a parameter so the next middleware is known inside the function
 app.get('/api/persons/:id', (request, response, next) => {
     const id = request.params.id
     Person.findById(id)
        .then(person => {
            // if id is a valid format.. if person is found, return it else return 404 not found
            if (person) {
                response.json(person)
            } else {
                next(error)
            }
        })
        .catch(error => {
            next(error)
        })
 })

 // always add error/exception handling when using promises
 app.delete('/api/persons/:id', (request, response, next) => {
     Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
        
 })


 app.get('/info', (request, response) => {
    async function getCount() {
        return Person.countDocuments()
    }
    let date = new Date();
    // is there a better way to do this?
    getCount().then(result => {
        console.log(result)
        response.send(
            `
            <p>Phonebook has info for for ${result} people</p>
            <p>${date}</p>
            `
        );
    })
 })

 app.post('/api/persons', (request, response, next) => {
     const body = request.body
     if (!body || !body.number) {
         return response.status(400).json({
             error: 'content missing'
         })
     }

     // create new person document
     const person = new Person({
         name: body.name,
         number: body.number,
     })

     console.log(Person.find({name: body.name}))
     

     // save document to colleciton
     person.save().then(savedPerson => savedPerson.toJSON())
        .then(savedFormattedPerson => response.json(savedFormattedPerson))
        .catch(error => next(error))
     
 })

 app.put('/api/persons/:id', (request, response, next) => {
     const body = request.body
     const person = {
         name: body.name,
         number: body.number,
     }
     // new: true tells event handler to be called with the modified doc
     const opts = { runValidators: true }
     Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
 })

 const unknownEndpoint = (request, response) => {
     response.status(404).send({error: 'unknown endpoint'})
 }

 app.use(unknownEndpoint)

// Define middleware error handler method to handle errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    // if it is not a formatting error, pass the error to the next handler
    next(error)
}
// use the middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})