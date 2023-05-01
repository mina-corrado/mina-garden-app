import React, { useState } from "react"
import { Col, Row, Button, Form } from "react-bootstrap";

const MyOrders = (props) => {
    const {orders, isAdmin } = props;
    const token = localStorage.getItem("token");
    const basepath = process.env.REACT_APP_BASE_PATH;
    let items = {};
    if (orders) {
        orders.map((order)=>  { items = {...items, [order._id]: false}; return false; })
    }
    // console.log(items);
    const [displayItem, setDisplayItem] = useState(items);
    const handleDisplayModificaStato = (order) => {
        const key = order._id;
        setDisplayItem( {...items, [key]: !displayItem[key] } );
        setAddress(order.address);
        setStatus(order.status);
    }
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const onSubmit = (event, order)=>{
        event.preventDefault();
        order.status = status;
        order.address = address;
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({...order, status, address})
        }
        fetch(`${basepath}/api/orders/${order._id}`, headers).then(res=>res.json())
        .then(res=>{
            console.log('success', res);
            const key = order._id;
            setDisplayItem( {...displayItem, [key]: !displayItem[key] } );
        }, err=>{
            console.log(err)
        })
    }
    return (
        <>
            <ul>
            {orders && orders.map((order) => 
                <li key={order._id}>
                    <Row className="mb-1">
                        <Col lg="8">
                        Ordine: {order._id} effettuato il {order.created.split('T')[0]} alle {order.created.split('.')[0].split('T')[1]} totale {order.total} EUR 
                        </Col>
                        <Col>
                        STATUS: {order.status}
                        </Col>
                        <Col>
                        {isAdmin && <Button variant="outline-secondary" size="sm" onClick={()=>handleDisplayModificaStato(order)}>Elabora</Button>
                        }
                        </Col>
                    </Row>                    
                    {isAdmin && displayItem[order._id] &&
                        <Form className="form-order-modify" onSubmit={(event)=>onSubmit(event, order)}>
                            <Row className="mb-4">
                                <Col lg="4">
                                    <Form.Group controlId={`order-${order._id}-status`} className="mt-0">
                                        <Form.Label>Ordine stato</Form.Label>
                                        <Form.Control size="sm" as="select" onChange={(e)=>setStatus(e.target.value)} value={status}>
                                            <option>pending</option>
                                            <option>elaborato</option>
                                            <option>spedito</option>
                                            <option>rifiutato</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col lg="6">
                                    <Form.Group controlId={`order-${order._id}-address`} className="mt-0">
                                        <Form.Label>Indirizzo</Form.Label>
                                        <Form.Control size="sm" className="my-0"
                                        placeholder="Indirizzo" value={address} onChange={(e)=> setAddress(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col lg="2">
                                    <Form.Group className="d-flex flex-column h-100 justify-content-end">
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="dark"
                                        >
                                            Invia
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    }
                </li>)
            }
            {!orders && <li><div>Nessun ordine effettuato.</div></li>}
            </ul>
            <hr></hr>
        </>
    )
}

export default MyOrders;