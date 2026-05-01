import currentOrdersList from '../../currentOrdersTest.json'

function CurrentOrders(props) {
    console.log(currentOrdersList)
    return (
        <div>
            {currentOrdersList.map((order) => (
                <div key={order.id}>
                    <p>Name: {order.customerName}</p>
                    <ul>Order Summary:
                    {order.orderSummary.map((item, idx) => (
                        <li key={order.id + idx}>{item.itemName}<span> x{item.quantity}</span></li>
                    ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default CurrentOrders