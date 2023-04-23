import React, { useCallback, useState } from "react";
import Page from '../components/Page';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import FormRose from "../components/FormRose";

const Admin = () => {
    const [text, setText] = useState("");
    const [photos, setPhotos] = useState([]);
    const [rose, setRose] = useState(null);
    const [displayNew, setDisplayNew] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const handleChange = useCallback(value => {
        setText(value);
    });
    const basepath = process.env.REACT_APP_BASE_PATH;
  
    const token = localStorage.getItem("token");
  
    const onSubmitNew = (event) => {
      event.preventDefault();
  
      
      const form = event.currentTarget;
      // console.log(form);
      if (form.checkValidity() === false) {
        return;
      }
      
      const data = {
        title: form.querySelector('#rose-form').value,
        category: form.querySelector('#rose-category').value,
        description: text
      };
      const headers = {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify(data)
      }
  
      fetch(`${basepath}/api/roses`, headers).then(res=>res.json())
      .then(res=>{
        // reset
        form.querySelector('#rose-form').value = '';
        form.querySelector('#rose-category').value = '';
        setText('');

        // se ok carico foto
        // console.log("RES ", res.result);
        if (!res.result._id){
          return;
        }
        const formData = new FormData();
        for(let i=0; i < photos.length; i++){
          formData.append("photos", photos[i]);
        }
        const headers = {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            method: 'PATCH',
            body: formData
        }
        fetch(`${basepath}/api/roses/${res.result._id}/photos`, headers).then(res=>res.json())
        .then(res=>{
          console.log('success photos ');
          setPhotos([]);
          form.reset();
        }, (err)=>{
          //gestione errore foto
          console.log(err);
        })
      }, (err)=>{
          //gestione errore
          console.log(err);
      })
    }

    const onSubmitGetRose = (event) => {
      event.preventDefault();
      // id and fetch rose
      const form = event.currentTarget;
      const id = form.querySelector('#roseid-form').value;

      const headers = {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
          method: 'GET'
      }
      fetch(`${basepath}/api/roses/${id}`, headers).then(res=>res.json()).then(res=>{
        // success
        setRose(res);
      }, (err) => {
        console.log(err)
      })
    }

    const onSubmitModify = (event) => {
      // modify rose
    }

    const handleClickNew = () => {
      setDisplayNew(true);
      setDisplayEdit(false);
      
      setRose(null);
    }
    const handleClickEdit = () => {
      setDisplayNew(false);
      setDisplayEdit(true);
      
      setRose(null);
    }
    return(
        <Page>
          <Container className="admin-container">
            <Row>
              <Col lg="2">
                <div className="toolbar">
                  <Button onClick={handleClickNew}>Nuova Rosa</Button>
                  <Button onClick={handleClickEdit}>Modifica Rosa</Button>
                </div>
              </Col>
              <Col lg="10">
                {displayNew &&
                  <Container className="new-rose-container">
                    <h2>Nuova Rosa</h2>
                    <FormRose 
                      onSubmit={onSubmitNew} 
                      handleChangeText={handleChange}
                      handleChangePhotos={(photos)=>setPhotos(photos)}
                      text={text}></FormRose>
                  </Container>
                }
                {displayEdit &&
                  <Container className="edit-rose-container">
                    <h2>Modifica Rosa</h2>
                    {!rose &&
                        <Form className="mt-0" onSubmit={onSubmitGetRose}>
                          <Form.Group controlId="roseid-form" className="mt-0">
                              <Form.Label>ID Rosa</Form.Label>
                              <Form.Control size="lg" placeholder="ID" />
                          </Form.Group>
                          <Form.Group className="d-flex mt-3 justify-content-end">
                          <Button type="reset" size="lg" variant="outline-dark">
                              Reset
                          </Button>
                          <Button
                              type="submit"
                              size="lg"
                              variant="dark"
                              style={{
                              marginLeft: "1em",
                              }}
                          >
                              Invia
                          </Button>
                          </Form.Group>
                        </Form>
                    }
                    {rose &&
                      <FormRose
                        data={rose}
                        onSubmit={onSubmitModify} 
                        handleChangeText={handleChange}
                        handleChangePhotos={(photos)=>setPhotos(photos)}
                        text={text}
                        hideFile={true}></FormRose>
                    }
                  </Container>
                }
              </Col>
            </Row>
          </Container>

        </Page>
    )
}

export default Admin;