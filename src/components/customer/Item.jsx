function Item(props) {
    const {name, price, img, description} = props.itemData  //as I need more information from the item object, I'll add them as bindings to the const declaration here
    return (
        <div className="menuItem">
            <div>
                <img src={img}></img> 
            </div>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default Item