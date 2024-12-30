import { StrictMode } from 'react'
import App from './App';
import { createRoot } from 'react-dom/client';

//----------------------------------------------Importing JavaScript-----------------------------------------

// import './Javascript/script';

//-------------------------------------------Main Application------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)