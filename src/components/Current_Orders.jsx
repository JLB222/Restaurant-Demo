import currentOrdersList from '../currentOrdersTest.json'

function CurrentOrders(props) {
    console.log(currentOrdersList)
    return (
        <h1>This is where customer orders will appear, ideally sorted by pickup time</h1>
    )
}

export default CurrentOrders