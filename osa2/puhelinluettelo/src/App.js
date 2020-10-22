import React, { useEffect, useState } from 'react';
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])
  const [filteredPhonebook, setNewFilteredPhonebook] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError]= useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNewFilterChange = (event) => {
    const filteredPhonebook = persons.filter(person => person.name.includes(event.target.value))
    setNewFilteredPhonebook(filteredPhonebook);
    setShowFiltered(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)

    //Is there already a contact with this name?
    if (names.includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)

      if (result) {
        //Replacing old number with new one
        const personToChange = persons.find(persons => persons.name === newName)
        const updatedContact = { ...personToChange, number: newNumber}

        personService
          .update(updatedContact.id, updatedContact)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== updatedContact.name ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setNotificationMessage(`Updated ${newName}'s phone number to ${updatedContact.number}`)
            setIsError(false)
            setTimeout(() => {setNotificationMessage(null)}, 3000)
          })
          .catch(error => {
            //Name removed from server -> remove it from the list
            setPersons(persons.filter(n => n.name !== newName))

            setNotificationMessage(`Information of ${newName} has already been removed from server`)
            setIsError(true)
          })
      }
    } else {
      //Creating a new contact
      const personObject = { name: newName, number: newNumber }

      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
      })
      setNotificationMessage(`Added ${newName}`)
      setIsError(false)
      setTimeout(() => {setNotificationMessage(null)}, 3000)
    }
  }

  const deleteContact = (name, id) => {
    const result = window.confirm(`Delete ${name}?`)

    if (result) {
      personService
        .deleteContact(id)
        .then(returnedPersons => {
          setPersons(persons.filter(person => person.id !== id))
          setShowFiltered(false)
          
          setNotificationMessage(`Removed ${name}`)
          setIsError(false)
          setTimeout(() => {setNotificationMessage(null)}, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter handler={handleNewFilterChange}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        submit={addNewPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons phonebook={filteredPhonebook} persons={persons} showFiltered={showFiltered} deleteContact={deleteContact}/>
    </div>
  )
}

export default App;