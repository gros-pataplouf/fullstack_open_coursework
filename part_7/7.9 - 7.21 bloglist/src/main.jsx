import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './reducers/notificationReducer'
const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)