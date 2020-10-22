import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({ countries }) => {
  const [showSingleCountry, setShowSingleCountry] = useState(false)
  const [singleCountry, setSingleCountry] = useState([])

  function showSelectedCountry(props) {
    setShowSingleCountry(true)
    setSingleCountry(props)
  }

  if (showSingleCountry) {
    return (
      <CountryDetails country={singleCountry}/>
    )
  } else {
    return (
      <div>
        {countries.map(countries =>
          <div key={countries.name}>
            {countries.name}
            <button onClick={() => showSelectedCountry(countries)}>Show</button>
          </div>
        )}
      </div>
    )
  }
}

export default CountryList