import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, eraseNotification } from '../reducers/notificationReducer'
import { setUser, logout } from '../reducers/userReducer'

import loginService from '../services/login'
import usersService from '../services/users'
const Login = () => {
  const [input, setInput] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login(input)
      const relatedUser = await usersService.getOne(response.id)
      const userInState = {
        token: response.token,
        id: response.id,
        username: response.username,
        name: relatedUser.name,
        isLoggedIn: true,
      }
      dispatch(setUser(userInState))
      window.localStorage.setItem('blogUser', JSON.stringify(userInState))
    } catch (e) {
      console.error(e.response.data.error)
      dispatch(createNotification({text: e.response.data.error, type:'warning'}))
      setTimeout(() => {dispatch(eraseNotification())}, 2000) 
    }
  }
  const handleLogOut = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(logout())
    console.log("logged out")
    console.log(user)
    setInput({
      username: '',
      password: '',
    })
  }

  const handleChange = (property) => (e) => {
    setInput({ ...input, [property]: e.target.value.trim() })
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form data-testid="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
            data-testid="login-username"
            value={input.username}
            onChange={handleChange('username')}
          />
          <label htmlFor="username">username</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleChange('password')}
            data-testid="login-password"
          />
          <label htmlFor="password">password</label>
          <button data-testid="login-button">Log in</button>
        </form>
      </div>
    )
  } else {
    return (
      <>
        <div>You are logged in as {user.name}.</div>
        <button onClick={handleLogOut}>Log out</button>
      </>
    )
  }
}

export default Login
