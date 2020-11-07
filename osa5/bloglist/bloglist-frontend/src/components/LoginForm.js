import React, { useState, useEffect } from 'react'

import '../index.css'

import loginService from '../services/login'
import blogService from '../services/blogs'

import Notification from'../components/Notification'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationIsError, setNotificationIsError]= useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong username or password')
      setNotificationIsError(true)
      setTimeout(() => {setNotificationMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <h1>Login to application</h1>
      <Notification message={notificationMessage} isError={notificationIsError} />
      <form id='loginForm' onSubmit={handleLogin}>
        <div>
          Username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id ='loginButton' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm