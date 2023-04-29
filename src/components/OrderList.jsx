import { useContext, useEffect, useState } from 'react';
import { OrderContext, UserContext } from '../context/Context';
import { Col, Row, Button, Container } from 'react-bootstrap';
import MyOrders from './MyOrders';

const OrderList = () => {
    const {order, setOrder} = useContext(OrderContext);
    const {user} = useContext(UserContext);
    const basepath = process.env.REACT_APP_BASE_PATH;
    const token = localStorage.getItem("token");
    const [ordered, setOrdered] = useState(false);
    const [userOrders, setUserOrders] = useState([]);

    let tot = 0;
    const handleOrdina = () => {
        if (!token) {
            alert("Bisogna essere registrati per effettuare un ordine.");
            return;
        }
        const data = {
            customer: user.email,
            total: tot,
            created: new Date().toISOString(),
            items: order,
        }
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
        fetch(`${basepath}/api/orders`, headers).then(res=>res.json())
        .then(res=>{
            console.log(res);
            setUserOrders((prevState)=>[...prevState, res.result]);
            setOrdered(true);
            setOrder([]);
        }, err=>{
            console.log(err);
        })
    }
    const handleReset = () => {
        setOrder([]);
    }
    useEffect(()=>{
        if (!token) {
            return;
        }
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            method: 'GET'
        }
        fetch(`${basepath}/api/orders`, headers).then(res=>res.json())
        .then(res=>{
            console.log(res);
            setUserOrders(res.results);
        }, err=>{
            console.log(err);
        })
    },[]);

    return( 
        <>
        <h3>I miei ordini effettuati</h3>
        <MyOrders orders={userOrders}></MyOrders>
        {order && order.length > 0 ?
            <Container className='order-list mt-4'>
                <Row>
                    <Col lg="6" md="8" xs="12" className='round-top m-auto'>
                        <Row>
                            <Col lg="7" md="6" xs="6">
                                <strong>Rosa</strong>
                            </Col>
                            <Col lg="3" md="3" xs="3">
                                <strong>Prezzo</strong> 
                            </Col>
                            <Col lg="2" md="3" xs="3">
                                <strong>Quantità</strong>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {order.map((item, index) => {
                    tot += item.price.$numberDecimal * item.quantity;
                    return <Row key={`${item}_${index}`}>

                        <Col lg="6" md="8" xs="12" className='m-auto'>
                        <Row>
                            <Col lg="7" md="6" xs="6">
                                {item.title}
                            </Col>
                            <Col lg="3" md="3" xs="3">
                                {item.price.$numberDecimal} EUR 
                            </Col>
                            <Col lg="2" md="3" xs="3" className='text-center'>
                                {item.quantity}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                })
                }
                <Row>
                    <Col lg="6" md="8" xs="12" className='round-bottom m-auto mb-4'>
                        <Row>
                            <Col lg="7" md="6" xs="6">
                            <p style={{marginTop: '2rem'}}>
                                Totale: <strong>{tot} EUR</strong>
                            </p>
                            </Col>
                            <Col lg="3">
                            </Col>
                            <Col lg="2">
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col lg="8" className='buy text-center'>
                        <Button variant='secondary' onClick={handleReset} style={{marginRight: 8}}>Reset</Button>
                        <Button variant='primary' onClick={handleOrdina}>Ordina Ora</Button>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
            :
            <div className='text-center text-muted h3 mt-5'>Nessuna Rosa da ordinare.</div>
        } 
        {ordered && <div className='text-center text-muted h3 mt-2'>Grazie per averci scelto!</div>}
        </>   
    )
}

export default OrderList;