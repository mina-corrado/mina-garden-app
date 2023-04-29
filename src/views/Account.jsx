import React, { useEffect, useContext, useState } from "react";
import Page from '../components/Page';
import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { UserContext } from '../context/Context';
import Loader from "../components/Loader";

const Account = () => {
    const basepath = process.env.REACT_APP_BASE_PATH;
    const token = localStorage.getItem("token");
    const {user} = useContext(UserContext);
    const [account,setAccount] = useState(null);

    useEffect(()=>{
      const headers = {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        method: 'GET'
      }
      fetch(`${basepath}/api/users/${user.id}`, headers).then(res=>res.json())
      .then(res=>{
        // console.log("Account ", res);
        setAccount(res);
      }, (err)=>{
        //gestione errore 
        console.log(err);
      });
    },[])

    if (!account) {
      return <Loader />
    }
    return(
        <Page>
          <Container className="admin-container">
            <h1>Account</h1>
            <Container  className="mt-5">
              <Row>
                <Col lg="4" className="m-auto">
                  <Row>
                    <Col lg="6">
                      <strong>Nome: </strong>
                    </Col>
                    <Col lg="6">
                      {account.nome}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <strong>Cognome: </strong>
                    </Col>
                    <Col lg="6">
                      {account.cognome}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <strong>Email: </strong>
                    </Col>
                    <Col lg="6">
                      {account.email}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <strong>Data di nascita: </strong>
                    </Col>
                    <Col lg="6">
                      {account.data_di_nascita}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>

        </Page>
    )
}

export default Account;