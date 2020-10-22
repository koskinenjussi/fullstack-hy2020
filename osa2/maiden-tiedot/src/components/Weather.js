import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

export default Weather