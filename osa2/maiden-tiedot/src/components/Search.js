import React from 'react'

const Search = ({ handler }) => {
    return (
      <form>
        <div>Find countries <input onChange={handler} /></div>
      </form>
    )
  }

export default Search