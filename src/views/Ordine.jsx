import { Container, Row, Col } from 'react-bootstrap';
import Page from '../components/Page';
import OrderList from '../components/OrderList';

const Ordine = () => {
    return(
        <Page>
            <Container>
                <h1>Ordine</h1>
                <Row>
                    <Col lg="12">
                        <OrderList></OrderList>
                    </Col>
                </Row>
            </Container>
        </Page>
    )
}

export default Ordine;