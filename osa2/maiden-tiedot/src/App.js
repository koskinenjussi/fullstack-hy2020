import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = ({ handler }) => {
  return (
    <form>
      <div>Find countries <input onChange={handler} /></div>
    </form>
  )
}

const Countries = ({ countries }) => {
  if (countries.length <= 10 && countries.length > 0) {
    if (countries.length === 1) {
      return (
        <CountryDetails country={countries[0]} />
      )
    } else {
      return (
        <CountryList countries={countries} />
      )
    }
  } else if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else {
    return (
      <div />
    )
  }
} 

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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
    .then(response => {
      setWeather(response.data)
    })
  }

  useEffect(hook, [])

  //If weather data is not loaded
  if (!weather.location) {
    return (
      <div />
    )
  } else {
    //Weather data is loaded
    return (
      <div>
        <h1>Weather in {weather.location.name}</h1>
        <b>Temperature: </b> {weather.current.temperature} celsius
        <br />
        <img src={weather.current.weather_icons} alt="Current weather" width="100" height="100"/>
        <br />
        <b>Wind: </b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
      </div>
    )
  }
}

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