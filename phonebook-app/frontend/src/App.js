import { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import PersonService from './services/PersonService.js'
import Notification from './components/Notification.js'


const App = () => {

  const [persons, setPersons] = useState([])
  const [filterText, setFilterText] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')

  const handleFilterTextChange = (event) => (setFilterText(event.target.value))
  const handleNewNameChange = (event) => (setNewName(event.target.value))
  const handleNewNumberChange = (event) => (setNewNumber(event.target.value))

  const fields = [
    { text: 'name', onChange: handleNewNameChange, value: newName },
    { text: 'number', onChange: handleNewNumberChange, value: newNumber }
  ]

  const setNotificationWithReset = (message, thisIsAnErrorMsg = false, waitTime = 5000) => {
    thisIsAnErrorMsg ? setNotificationClass('error') : setNotificationClass('notification')
    setNotification(message)
    setTimeout(() => setNotification(null), waitTime)
  }

  // Get contacts from the server
  useEffect(() => {
    PersonService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  } ,[])

  const handleSubmitNewPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    // Name already in the phonebook
    const personWithSameName = persons.find(person => person.name === newName)
    if (personWithSameName) {
      const queryString = `${newName} is already added to the phonebook, replace the old number with a new one?`
      if (window.confirm(queryString)) {
        PersonService
          .replace(personWithSameName.id, newPerson)
          .then(data => {
            setPersons(persons.map(person => person.name === data.name ? data : person))
            setNotificationWithReset(`Number for ${data.name} updated to ${data.number}`)
          })
          .catch(error => {
            if (error.request.status === 404) {
              setPersons(persons.filter(person => person.id !== personWithSameName.id))
              setNotificationWithReset(`Informarion of ${newName} does not exist on the server`, true)
            }
            if (error.request.status === 400) {
              setNotificationWithReset(error.response.data.error, true)
            }
          })
      }
      return
    }

    // New person
    PersonService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNotificationWithReset(`${data.name} added`)
      })
      .catch(error => {
        setNotificationWithReset(error.response.data.error, true)
        return
      })

    // Clear form
    setNewName('')
    setNewNumber('')
  }

  const handleRemovePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    if (window.confirm(`Remove ${personToRemove.name}?`)) {
      PersonService.remove(id).then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
        setNotificationWithReset(`${personToRemove.name} removed`)
      })}
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} classForNotification={notificationClass} />
      <Filter onChange={handleFilterTextChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSubmitNewPerson} fields={fields} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleRemove={handleRemovePerson} />
    </div>
  )
}


export default App