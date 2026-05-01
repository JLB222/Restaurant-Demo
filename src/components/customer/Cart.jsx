import { Link } from "react-router-dom"

function Cart(props) {
    const {cartContents, addToCart, removeFromCart} = props
    return (
        <div>
            {cartContents.length? <p>Total Cost: ${props.cartContents.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p> : "No items currently in cart."}
            {cartContents.map((el) => (
                <li key={el.id}>{el.name}: {el.quantity} x ${el.price.toFixed(2)} = ${(el.quantity * el.price).toFixed(2)}
                    <span onClick={() => addToCart(el)}>+</span>
                    <span onClick={() => removeFromCart(el)}>-</span>
                </li>
            ))}
            {cartContents.length? <p><Link to="/checkout">Place Order</Link></p> : null}
        </div>
    )
}


export default Cart