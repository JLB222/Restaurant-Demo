import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


//customer components
import Home from './components/customer/Home'
import Menu from './components/customer/Menu'  
import Cart from './components/customer/Cart'

function App() {
  const [itemsInCart, setItemsInCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });// Load data on startup; if there is existing data, load that, otherwise load the hard-coded seed file
  const [userData, setUserData] = useState({})  //this will be the object where we store user name and phone, for the purpose of customer identification on pick-up of their order in store

  // Whenever cart state changes, save to localStorage
  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  function addItemToCart(newItem) {
    setItemsInCart(prev => {
        const itemToBeAdded = prev.find(el => el.id === newItem.id)  //if there's no existing item of the type clicked already in the cart, this'll be undefined (and therefore false)
        if (itemToBeAdded) {
          return prev.map(item => item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item) //search through all elements in the array for an element whose ID matches the one clicked; replace (via map) that element with itself but the quantity increased; if it doesn't match, leave it alone
        }
        else {
          return [...prev, {...newItem, quantity: 1}]  //if item doesn't exist in the cart, add it and append the quantity property and give it a value of 1
        }
    })
  }

  function removeItemFromCart(itemToRemove) {
    setItemsInCart(prev => {
      const itemToBeRemoved = prev.find(el => el.id === itemToRemove.id) 
      if (itemToBeRemoved.quantity > 1) {  //if there's more than one, reduce the quantity by 1
        return [...prev].map((item) => item.id === itemToRemove.id ?  {...item, quantity: item.quantity -1} : item)
      }
      if (itemToBeRemoved.quantity == 1) { //if there's exactly one, remove it from the cart via filtering
        return [...prev].filter((item) => item.id !== itemToRemove.id)
      }
    })
  }

  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">Cart</Link><span> {itemsInCart.reduce((a,b) => a + b.quantity, 0) || ""}</span></li>
            </ul>
          </nav>
        </header>
        <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={
              <Menu 
                addToCart={(menuItem) => addItemToCart(menuItem)}
              />
            }/>
            <Route path="/cart" element={
              <Cart 
                cartContents={itemsInCart}
                addToCart={(menuItem) => addItemToCart(menuItem)}
                removeFromCart={(menuItem) => removeItemFromCart(menuItem)}
              />
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App


//what to do next:
//remove cart altogether
//dress up home page
//dress up menu page

//Done:
//removed stripe integration
