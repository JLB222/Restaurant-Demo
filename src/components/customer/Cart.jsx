import { Form, Link } from "react-router-dom"
import { useState } from "react"

function Cart(props) {
    const {cartContents, addToCart, removeFromCart} = props

    return (
        <div>
            {cartContents.length? <p>Total Cost: ${props.cartContents.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p> : "No items currently in cart."}
            {cartContents.map((el) => (
                <li key={el.id}>{el.name}: {el.quantity} x ${el.price.toFixed(2)} = ${(el.quantity * el.price).toFixed(2)}
                    <button onClick={() => addToCart(el)}>+</button>
                    <button onClick={() => removeFromCart(el)}>-</button>
                </li>
            ))}
        </div>
    )
}


export default Cart