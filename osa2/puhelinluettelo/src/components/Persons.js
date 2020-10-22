import React from 'react'

const Persons = ({ phonebook, persons, showFiltered, deleteContact }) => {
    //Show the filtered phonebook
    if (showFiltered) {
      return( 
        <div>
          {phonebook.map(persons =>
            <div key={persons.name}>
              {persons.name} {persons.number} <button onClick={() => deleteContact(persons.name, persons.id)}>Delete</button>
            </div>
          )}
        </div>
      )
    } else {
      //Show all contacts
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

export default Persons