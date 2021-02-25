const mongoose = require('mongoose');

// DELETE THIS PASS BEFORE PUSHING TO GH
const password = 'nmKedjwCzUUtQtsN' 
const url = `mongodb+srv://phonebook:${password}@cluster0.fu1ul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// Define schema
// MongoDB doesn't use schema's, but mongoose enforces it at application level
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Create model with defined schema
const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    addNum(name, number);
} else {
    getNums()
}


function addNum(name, number) {
    // Model "Number" is a constructor function, creates the object that contains the new document with associated methods
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

function getNums() {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(entry => {
            console.log(`${entry.name}: ${entry.number}`)
        })
        mongoose.connection.close()
    })
}
