import { useState, useEffect } from 'react'
import './App.css'
import { siteConfig } from '../config/site'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


//page components
import Home from './components/Home'
import Menu from './components/Menu'  

//element components
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu/>}/>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}
export default App


//what to do next:
//dress up home page
//dress up menu page
//create menu.js to reflect business's products
//dress up social media icons

//Done:
//removed stripe integration
//remove cart altogether
//removed add to cart buttons
//created siteConfig.js to customize Home with business information
//created header component
//created footer component