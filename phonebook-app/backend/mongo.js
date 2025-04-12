const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as the first argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Give password, name and number to add a new person.')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack2021:${password}@cluster0.1criz.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('Phonebook:')
    persons.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}

if (process.argv.length >= 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
}