import { Form, Link } from "react-router-dom"
import { useState } from "react"

function Cart(props) {
    const [readyToCheckout, setReadyToCheckout] = useState(false)
    const {cartContents, addToCart, removeFromCart, handleCheckout, getUserInformation, userInformation} = props

   

    return (
        <div>
            {cartContents.length? <p>Total Cost: ${props.cartContents.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p> : "No items currently in cart."}
            {cartContents.map((el) => (
                <li key={el.id}>{el.name}: {el.quantity} x ${el.price.toFixed(2)} = ${(el.quantity * el.price).toFixed(2)}
                    <button onClick={() => addToCart(el)}>+</button>
                    <button onClick={() => removeFromCart(el)}>-</button>
                </li>
            ))}
            {/* {cartContents.length? <button onClick={() => handleCheckout()}>Place Order</button> : null} */}
            {cartContents.length? <button onClick={() => setReadyToCheckout(true)}>Proceed to Checkout</button> : null}
            {readyToCheckout ? 
                    <div className="form">
                        Name:<input type="text" name="userName" id="name" required onChange={(e) => getUserInformation(e.target.name, e.target.value)}/>
                        Phone:<input type="tel" name="userPhone" id="phone" required onChange={(e) => getUserInformation(e.target.name, e.target.value)}/>
                        <input type="submit" value="Place Order!" onClick={() => handleCheckout()}/>
                    </div>
            : null}
        </div>
    )
}


export default Cart