import { useState } from 'react'
import './App.css'

//main page components
import Home from './components/Home'
import Menu from './components/Menu'  
import Cart from './components/Cart'


function App() {
  const [isViewingHome, setIsViewingHome] = useState(true)
  const [isViewingMenu, setIsViewingMenu] = useState(false)
  const [isViewingCart, setIsViewingCart] = useState(false)

  const [itemsInCart, setItemsInCart] = useState([])


  function viewHome() {
    setIsViewingHome(true)
    setIsViewingMenu(false)
    setIsViewingCart(false)
  }

  function viewMenu() {
    setIsViewingHome(false)
    setIsViewingMenu(true)
    setIsViewingCart(false)
  }

  function viewCart() {
    setIsViewingHome(false)
    setIsViewingMenu(false)
    setIsViewingCart(true)
  }

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
      <header>
        <nav>
          <ul>
            <li onClick={() => viewHome()}>Home</li>
            <li onClick={() => viewMenu()}>Menu</li>
            <li onClick={() => viewCart()}>Cart</li>
          </ul>
        </nav>
      </header>
      <section>
        {isViewingHome && <Home/>}
        {isViewingMenu && 
          <Menu
            addToCart={(menuItem) => addItemToCart(menuItem)}
          />
        }
        {isViewingCart && 
          <Cart
            cartContents={[...itemsInCart]}
            addToCart={(menuItem) => addItemToCart(menuItem)}
            removeFromCart={(menuItem) => removeItemFromCart(menuItem)}
          />
        }
      </section>
    </>
  )
}
export default App
