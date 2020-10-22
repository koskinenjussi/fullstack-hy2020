import React from 'react'
import CountryDetails from './CountryDetails'
import CountryList from './CountryList'

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

export default Countries