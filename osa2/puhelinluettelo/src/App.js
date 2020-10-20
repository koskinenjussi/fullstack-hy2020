import React, { useState } from 'react';

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

const Persons = ({ phonebook, persons, showFiltered }) => {
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
          <div key={persons.name}>
            {persons.name} {persons.number}
          </div>
        )}
      </div>
    )
  }
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filteredPhonebook, setNewFilteredPhonebook ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFiltered, setShowFiltered ] = useState(false)

  const addNewPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNewFilterChange = (event) => {
    const filteredPhonebook = persons.filter(person => person.name.includes(event.target.value))
    setNewFilteredPhonebook(filteredPhonebook);

    setShowFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons phonebook={filteredPhonebook} persons={persons} showFiltered={showFiltered} />
    </div>
  )
}

export default App;
