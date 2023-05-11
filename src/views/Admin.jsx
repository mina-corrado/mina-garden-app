import React, { useCallback, useState, useEffect } from "react";
import Page from '../components/Page';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import FormRose from "../components/FormRose";
import DisplayOrders from "../components/DisplayOrders";

const Admin = () => {
    const [text, setText] = useState("");
    const [photos, setPhotos] = useState([]);
    const [addPhotos, setAddPhotos] = useState([]);
    const [rose, setRose] = useState(null);
    const [displayNew, setDisplayNew] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayOrders, setDisplayOrders] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        description: text,
        price: form.querySelector('#rose-price').value,
        order: form.querySelector('#rose-order').value
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

          resetAdmin();
        }, (err)=>{
          //gestione errore foto
          console.log(err);
        })
      }, (err)=>{
          //gestione errore
          console.log(err);
      })
    }

    const resetAdmin = () => {
      setDisplayNew(false);
      setDisplayEdit(false);
        
      setRose(null);
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
        setPhotos(res.photos);
      }, (err) => {
        console.log(err)
      })
    }

    const onSubmitModify = (event) => {
      console.log('modifyRose');
      // modify rose
      event.preventDefault();
      // id and fetch rose
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        return;
      }
      
      const data = {
        title: form.querySelector('#rose-form').value,
        category: form.querySelector('#rose-category').value,
        description: text,
        price: form.querySelector('#rose-price').value,
        order: form.querySelector('#rose-order').value,
        photos: photos
      };
      const id = rose._id;

      const headers = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          method: 'PUT',
          body: JSON.stringify(data)
      }
      fetch(`${basepath}/api/roses/${id}`, headers).then(res=>res.json()).then(res=>{
        // success
        // reset
        form.querySelector('#rose-form').value = '';
        form.querySelector('#rose-category').value = '';
        setText('');
        
        resetAdmin();
      }, (err) => {
        console.log(err)
      })
    }

    const handleClickNew = () => {
      setDisplayNew(true);
      setDisplayEdit(false);
      setDisplayOrders(false);
      
      setRose(null);
      setText("");
    }
    const handleClickEdit = () => {
      setDisplayNew(false);
      setDisplayEdit(true);
      setDisplayOrders(false);
      
      setRose(null);
      setText("");
    }
    const handleClickOrders = () => {
      setDisplayNew(false);
      setDisplayEdit(false);
      setDisplayOrders(true);
      
      setRose(null);
      setText("");
    }

    const handleAddPhotos = () => {
      const formData = new FormData();
      for(let i=0; i < addPhotos.length; i++){
        formData.append("photos", addPhotos[i]);
      }
      const headers = {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          method: 'PATCH',
          body: formData
      }
      fetch(`${basepath}/api/roses/${rose._id}/photos`, headers).then(res=>res.json())
      .then(res=>{
        console.log('success photos ', res);
        setAddPhotos([]);
        setRose((prevState)=>{ return {...prevState, photos: res.photos}});
        setPhotos(res.photos);       
      }, (err)=>{
        //gestione errore foto
        console.log(err);
      })
    }

    
    useEffect(()=>{
      console.log("addPhotos => ", addPhotos)
      if (addPhotos && addPhotos.length > 0) {
        handleAddPhotos();
      }
    // eslint-disable-next-line
    },[addPhotos])
    // useEffect(()=>{
    //   console.log("photos => ", photos)
    // },[photos])
    // useEffect(()=>{
    //   console.log("rose => ", rose)
    // },[rose])
    // useEffect(()=>{
    //   console.log("displayEdit => ", displayEdit)
    // },[displayEdit])
    return(
        <Page>
          <Container className="admin-container">
            <Row>
              <Col lg="2">
                <div className="toolbar">
                  <Button onClick={handleClickNew}>Nuova Rosa</Button>
                  <Button onClick={handleClickEdit}>Modifica Rosa</Button>
                  <Button onClick={handleClickOrders}>Ordini</Button>
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
                    <h2 className="d-inline">Modifica Rosa</h2>
                    <small> - {rose ? rose._id : ''}</small>
                    {!rose &&
                        <Form className="mt-0" onSubmit={onSubmitGetRose}>
                          <Form.Group controlId="roseid-form" className="mt-0">
                              <Form.Label>Immetti ID Rosa</Form.Label>
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
                        photos={photos}
                        onSubmit={onSubmitModify} 
                        handleChangeText={handleChange}
                        handleChangePhotos={(photos)=>setAddPhotos(photos)}
                        handleSetArrayPhotos={(photos)=>setPhotos(photos)}
                        text={text}
                        hideFile={true}></FormRose>
                    }
                  </Container>
                }
                {displayOrders &&
                  <DisplayOrders></DisplayOrders>
                }
              </Col>
            </Row>
          </Container>

        </Page>
    )
}

export default Admin;