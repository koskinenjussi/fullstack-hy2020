import React from 'react'

const Filter = ({ handler }) => {
    return (
      <form>
        <div>filter shown with: <input onChange={handler}/></div>
      </form>
    )
  }

  export default Filter