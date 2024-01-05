import loginService from '../services/login'
import usersService from '../services/users'
import Notification from './Notification'

const Login = ({ props }) =>  {
    const { user, setUser, input, setInput, message, setMessage } = props
    console.log(user.isLoggedIn)
    const handleLogin = async e => {
        e.preventDefault()
        try {
          const response = await loginService.login(input)
          const relatedUser = await usersService.getOne(response.id)
          const userInState = {token: response.token, id: response.id, username: response.username, name: relatedUser.name, isLoggedIn: true} 
          setUser(userInState)
          for (let [entry, value] of Object.entries(userInState)) {
            window.localStorage.setItem(entry, value)
          }
        } catch (e) {
          console.error(e)
          setMessage({type: 'warning', text: e.response.data.error})
          setTimeout(() => {
            setMessage({type: '', text: ''})
          }, 2000)


        }
    }
    const handleLogOut = () => {
      for (let entry in user) {
        console.log(entry)
        window.localStorage.removeItem(entry)
      }
      setUser({
        username: '',
        password: '',
        token: '',
        isLoggedIn: false,
        name: ''
      })
      setInput({
        username: '', 
        password: ''
      })
    }

    const handleChange = (property) => (e) => {
      setInput({...input, [property]: e.target.value.trim()})
    }


    if (!user.isLoggedIn) {
        return (
          <div>
            <h2>Log in to application</h2>
            <Notification message={message}/>
            <form onSubmit={handleLogin}>
              <input type='text' placeholder='username' id='username' name='username' value={input.username} onChange={handleChange('username')}/>
              <label htmlFor='username'>username</label>
              <input type='password' placeholder='password' id='password' name='password' value={input.password} onChange={handleChange('password')} />
              <label htmlFor='password'>password</label>
              <button>Log in</button>
            </form>
          </div>
        )
      } else {
        return (
        <>
        <div>
            You are logged in as {user.name}.
        </div>
        <button onClick={handleLogOut}>Log out</button>
        </>)
      }
    
    }

export default Login

