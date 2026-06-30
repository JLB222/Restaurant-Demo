import menuItems from '../menu.json'
import Item from './Item.jsx'

function Menu(props) {  //menuItems is an array of objects from menu.json; later this data will come from a database
    return (
        <ul>
            {menuItems.map((item) => (
                <li key={item.id}>
                    <Item itemData={item} />
                </li>
            ))}
        </ul>
    )  
}

export default Menu