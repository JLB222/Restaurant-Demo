function Cart(props) {
    const {cartContents, addToCart, removeFromCart} = props
    return (
        <div>
            {cartContents.length? <p>Total Cost: ${props.cartContents.reduce((total, item) => total + (item.price * item.quantity), 0)}</p> : "No items currently in cart."}
            {cartContents.map((el) => (
                <li key={el.id}>{el.name}: {el.quantity} x ${el.price} = ${el.quantity * el.price}
                    <span onClick={() => addToCart(el)}>+</span>
                    <span onClick={() => removeFromCart(el)}>-</span>
                </li>
            ))}
        </div>
    )
}


export default Cart