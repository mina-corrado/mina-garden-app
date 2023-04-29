import React from "react"

const MyOrders = (props) => {
    const orders = props.orders;
    return (
        <>
            <ul>
            {orders && orders.map((order) => 
                <li key={order}>
                    <div>Ordine: {order._id} effettuato il {order.created.split('T')[0]} alle {order.created.split('.')[0].split('T')[1]} totale {order.total} EUR - STATUS: {order.status}
                    {props.isAdmin && <button style={{marginLeft: 4}}>Elabora</button>}
                    </div>
                </li>)
            }
            {!orders && <li><div>Nessun ordine effettuato.</div></li>}
            </ul>
            <hr></hr>
        </>
    )
}

export default MyOrders;