import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Routers from './routes/Routers'
import './styles/App.css'
import React from 'react';

function App() {
  return (
    <div className='app_container'>
      <BrowserRouter>
        <div className='app_header'><Header /></div>
        <div className='app_main'><Routers /></div>
        <div className='app_footer'><Footer /></div>
      </BrowserRouter>
    </div>
  )
}

export default App