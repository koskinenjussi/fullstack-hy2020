import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/Blogs'

import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null && <LoginForm setUser={setUser}/>}
      {user !== null && <BlogList user={user} />}
    </div>
  )
}

export default App