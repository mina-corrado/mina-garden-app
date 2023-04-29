import { useEffect, useState } from "react";
import MyOrders from "./MyOrders"

const DisplayOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");
    const basepath = process.env.REACT_APP_BASE_PATH;

    useEffect(()=>{
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            method: 'GET'
        }
        fetch(`${basepath}/api/orders`, headers).then(res=>res.json())
        .then(res=>{
            setOrders(res.results)
        }, err=>{
            console.log(err)
        })
    },[basepath, token])

    return (
        <>
            <h2>Ordini</h2>
            <MyOrders orders={orders} isAdmin={true}></MyOrders>
        </>
    )
}

export default DisplayOrders;