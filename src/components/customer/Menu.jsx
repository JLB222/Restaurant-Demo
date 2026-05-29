import menuItems from '../../menu.json'
import Item from './Item.jsx'

function Menu(props) {  //menuItems is an array of objects from menu.json; later this data will come from a database
    return (
        <ul>
            {menuItems.map((item) => (
                <li 
                    key={item.id}
                >
                    <Item 
                        itemData={item} 
                    />
                    <button onClick={() => props.addToCart(item)}>Add To Cart</button>
                    {/* only here to test functionality; final position of the 'add to cart' button will decide where this goes; it may end up in the item.jsx */}
                </li>
            ))}
        </ul>
    )  
}

export default Menu