import React, { useEffect, useState } from 'react';
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ handler }) => {
  return (
    <form>
      <div>filter shown with: <input onChange={handler}/></div>
    </form>
  )
}

const PersonForm = ({ submit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={submit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ phonebook, persons, showFiltered, deleteContact }) => {
  if (showFiltered) {
    return( 
      <div>
        {phonebook.map(persons =>
          <div key={persons.name}>
            {persons.name} {persons.number}
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {persons.map(persons =>
          <div key={persons.id}>
            {persons.name} {persons.number} <button onClick={() => deleteContact(persons.name, persons.id)}>Delete</button>
          </div>
        )}
      </div>
    )
  }
}

function App() {
  const [persons, setPersons] = useState([])
  const [filteredPhonebook, setNewFilteredPhonebook] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError]= useState(null)

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

    if (names.includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)

      if (result) {
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
            console.log("ERROR")
            setNotificationMessage(`Information of ${newName} was not found`)
            setIsError(true)
          })
      }
      
    } else {
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

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNewFilterChange = (event) => {
    const filteredPhonebook = persons.filter(person => person.name.includes(event.target.value))
    setNewFilteredPhonebook(filteredPhonebook);
    setShowFiltered(event.target.value)
  }

  const deleteContact = (name, id) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      personService
        .deleteContact(id)
        .then(returnedPersons => {
          setPersons(persons.filter(person => person.id !== id))
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
