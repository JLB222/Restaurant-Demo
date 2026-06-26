import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


//customer components
import Home from './components/customer/Home'
import Menu from './components/customer/Menu'  
import Cart from './components/customer/Cart'
import Checkout from './components/customer/Checkout'
import Success from './components/customer/Success'
//admin components
import Admin from './components/admin/Admin'
import CurrentOrders from './components/admin/Current_Orders'
import EditMenu from './components/admin/EditMenu'

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

 function getUserInformation(field, value) {  //fields are userName and userPhone as seen on the Cart.jsx inputs
    setUserData(prev => ({
        ...prev,
        [field]: value
    }))
    console.log(field, value)
  }


  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleCheckout(cartItems, user) {
    if (!userData.userName.trim() || !userData.userPhone.trim()) return null  //throw an error to user? or trust that the 'required' placeholder text gives them enough information? 
    const res = await fetch(`${apiUrl}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({cartItems, user})
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
                getUserInformation={(fieldName, value) => getUserInformation(fieldName, value)}
                userInformation={userData}
                handleCheckout={() => handleCheckout(itemsInCart, userData)}
              />
            }/>
            <Route path="/success" element={
              <Success 
                cartContents={itemsInCart}
              />
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
//clear memory on success page isn't working.  why? *
  //it IS working; some console logs confirmed it.  but somehow the cart & local storage are refilling.  Why?
  //read up on React docs; 'render and commit' 'synchronizing with effects'
//admin convenience:  The admin should have header links to every page on the site; whereas customers should only see home, menu, cart
//need a way to deny orders placed during closed hours (or disallow them entirely); can we disconnect the 'place order' functionality during certain hours?
//[Stretch Goal][Potentially Unwanted]pay in store?  What if someone just wants to place the order online but pay in person?  Is there enough demand for that to justify it?
//send email to business that they've received an order?
//input sanitization:  proper US phone number from customer?
//does the useEffect on success.jsx even need to be there?
//delete checkout.jsx?  Since we use stripe, we arguably don't need it.  I say 'arguably' because we might be able to do an embedded Stripe deployment with it.  
//create admin: current orders
//create admit: edit menu/database
//added a trim method to the handlecheckout user info to get rid of empty space at the front and back

//Done:
//cart has a simple counter next to the link showing current number of items in cart
//success page complete; cancel redirects backto menu
//cart stored in localstorage; it stays put for both success and cancel.
//local storage is now cleared when the success page is accessed, be it by redirect (normal) or if user just navigates to /success manually (though I don't know why they would)
//local storage errors now cleaned up; initial state data is also cleaner; no redundant useEffect for initial state
//we have state set up to gather user name and phone;
//attach user name and phone to stripe metadata, then utilize that information to inform business who ordered what so they can match food to customer
//prevent order from placing unless user has input name and phone;
//added a trim method to the handlecheckout user info to get rid of empty space at the front and back
