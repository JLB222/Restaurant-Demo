function Item(props) {
    const {name, price, img} = props.itemData  //as I need more information from the item object, I'll add them as bindings to the const declaration here
    return (
        <div 
            className="menuItem"
        >
           <img src={img}></img> 
           <p>{name}: ${price.toFixed(2)}</p>
        </div>
    )
}

export default Item