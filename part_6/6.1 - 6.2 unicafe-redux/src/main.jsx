import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleFeedback = (e) => {
    store.dispatch({
      type: e.target.id
    })
  }

  return (
    <div>
      <button onClick={handleFeedback} id='GOOD'>good</button> 
      <button onClick={handleFeedback} id='OK'>ok</button> 
      <button onClick={handleFeedback} id='BAD'>bad</button>
      <button onClick={handleFeedback} id='ZERO'>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
