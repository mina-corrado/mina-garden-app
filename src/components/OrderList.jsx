import { useContext } from 'react';
import { OrderContext } from '../context/Context';
import { Col, Row, Button, Container } from 'react-bootstrap';

const OrderList = () => {
    const {order} = useContext(OrderContext);
    console.log("ORDER ", order);
    let tot = 0;
    return(     
        <Container className='order-list mt-4'>
            <Row>
                <Col lg="6" md="6" xs="6" className='round-top m-auto'>
                    <Row>
                        <Col lg="7" xs="7">
                            <strong>Rosa</strong>
                        </Col>
                        <Col lg="3" xs="3">
                            <strong>Prezzo</strong> 
                        </Col>
                        <Col lg="2" xs="2">
                            <strong>Quantità</strong>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {order.map((item, index) => {
                tot += item.price * item.quantity;
                return <Row key={`${item}_${index}`}>

                    <Col lg="6" md="6" xs="6" className='m-auto'>
                    <Row>
                        <Col lg="7" xs="7">
                            {item.title}
                        </Col>
                        <Col lg="3" xs="3">
                            {item.price} EUR 
                        </Col>
                        <Col lg="2" xs="2">
                            {item.quantity}
                        </Col>
                    </Row>
                    </Col>
                </Row>
            })
            }
            <Row>
                <Col lg="6" md="6" xs="6" className='round-bottom m-auto mb-4'>
                    <Row>
                        <Col lg="7">
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
                    <Button variant='primary'>Ordina Ora</Button>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderList;