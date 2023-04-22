import React, { useEffect, useState } from "react";
import CarouselRose from "./CarouselRose";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import Loader from "./Loader";

const Rose = (props) => {
    const {id} = props;
    const [rose, setRose] = useState(null);
    const basepath = process.env.REACT_APP_BASE_PATH;
    const token = localStorage.getItem('token');

    useEffect(()=>{
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            }
        }
        fetch(`${basepath}/api/roses/${id}`, headers).then(res=>res.json())
        .then(res=>{
            // set
            setRose(res);
        }, (err)=>{
            //gestione errore
            console.log(err);
        })  
    }, []);

    if (rose == null) {
        return <Loader />
    }
    
    const markupDescr = { __html: rose.description };
    return (
        <>
            <Container className="rose-single">
                <h1>{rose.title}</h1>
                <Row>
                    <Col lg={6}>
                        <CarouselRose title={''} items={rose.photos}></CarouselRose> 
                    </Col>
                    <Col lg="6">
                        <div className="description">
                            <div dangerouslySetInnerHTML={markupDescr}></div>
                        </div>
                        <Button variant="primary" className="mt-5">Aggiungi</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rose;