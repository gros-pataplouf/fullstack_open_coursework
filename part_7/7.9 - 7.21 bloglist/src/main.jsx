import ReactDOM from 'react-dom/client'
import App from './App'
import { notificationReducer } from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 

const reducer = combineReducers({
  notifications: notificationReducer,
})

export const store = createStore(reducer)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>)

