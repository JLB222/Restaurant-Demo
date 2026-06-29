import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


//customer components
import Home from './components/customer/Home'
import Menu from './components/customer/Menu'  

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App


//what to do next:
//dress up home page
//dress up menu page
//create siteConfig.js to customize Home with business information
//create menu.js to reflect business's products

//Done:
//removed stripe integration
//remove cart altogether
//removed add to cart buttons