import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


//customer components
import Home from './components/customer/Home'
import Menu from './components/customer/Menu'  
import Cart from './components/customer/Cart'
import Checkout from './components/customer/Checkout'
//admin components
import Admin from './components/admin/Admin'
import CurrentOrders from './components/admin/Current_Orders'
import EditMenu from './components/admin/EditMenu'

function App() {
  const [itemsInCart, setItemsInCart] = useState([])

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

  const apiUrl = import.meta.env.VITE_API_URL;
  
  async function handleCheckout(cartItems) {
    const res = await fetch(`${apiUrl}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({cartItems})
    });
    const data = await res.json(); 

    //redirect user to stripe checkout, but only on success
    if (res.ok) {
      window.location.href = data.url || "/menu"  //menu fallback during testing; just in case data.url comes back undefined
    } else {
      console.error("Checkout failed:", data.error)
    }
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
                handleCheckout={() => handleCheckout(itemsInCart)}
              />
            }/>
            <Route path="/checkout" element={
              <Checkout/>
            }/>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <Admin/>
            }/>
            <Route
              path="/currentOrders" element={
                <CurrentOrders/>
            }/>
            <Route
              path="/editMenu" element={
                <EditMenu/>
            }/>
      
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App


//what to do next:
//feedback:  when you add an item to cart, you can't even tell it worked.
//cart component:  items need a button to add them to cart, rather than clicking anywhere on the element;  In other words, clean up the item component and how the menu shows them
//admin convenience:  The admin should have header links to every page on the site; whereas customers should only see home, menu, cart