import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const StrictApp : React.JSX.Element = (
  <StrictMode>
  <App />
</StrictMode>  
)
createRoot(document.getElementById('root')!).render(StrictApp)
