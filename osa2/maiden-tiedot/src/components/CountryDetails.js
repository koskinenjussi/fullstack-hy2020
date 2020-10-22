import React from 'react'
import Weather from './Weather'

const CountryDetails = ({ country }) => {
    const languages = country.languages
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
        </div>
        <h1>Languages</h1>
        <div>
          <ul>
            {languages.map(language => 
              <li key={language.name}>
                {language.name}
              </li>  
            )}
          </ul>
          <img src={country.flag} alt="Selected country's flag" width="160" height="106" />
        </div>
        <Weather country={country} />
      </div>
    )
  }

export default CountryDetails