import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search'
import Countries from './components/Countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleNewSearch = (event) => {
    const tempSearchResults = allCountries.filter(country => country.name.includes(event.target.value))
    setSearchResults(tempSearchResults);
  }

  return(
    <div>
      <Search handler={handleNewSearch}/>
      <Countries countries={searchResults} />
    </div>
  )
}

export default App;