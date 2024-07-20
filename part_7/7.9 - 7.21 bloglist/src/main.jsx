import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' 
import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

import App from './App'


export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer, 
    user: userReducer

  }

})

console.log("running main")


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>)

