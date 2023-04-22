import React, { useCallback, useEffect, useState } from "react";
import Page from '../components/Page';
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const Admin = () => {
    const [text, setText] = useState("");
    const [photos, setPhotos] = useState([]);
    const [displayNew, setDisplayNew] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);

    const handleChange = useCallback(value => {
      setText(value);
    });
    const basepath = process.env.REACT_APP_BASE_PATH;
  
    const token = localStorage.getItem("token");
  
    const onSubmit = (event) => {
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
    
    const handleClickNew = () => {
      setDisplayNew(true);
      setDisplayEdit(false);
    }
    const handleClickEdit = () => {
      setDisplayNew(false);
      setDisplayEdit(true);
    }
    return(
        <Page>
          <Container className="admin-container">
            <div className="toolbar">
              <Button onClick={handleClickNew}>Nuova Rosa</Button>
              <Button onClick={handleClickEdit}>Modifica Rosa</Button>
            </div>
            {displayNew &&
              <Container className="new-rose-container">
                <Form className="mt-5" onSubmit={onSubmit}>
                  <Form.Group controlId="rose-form" className="mt-3">
                    <Form.Label>Titolo Rosa</Form.Label>
                    <Form.Control size="lg" placeholder="Title" />
                  </Form.Group>
                  <Form.Group controlId="rose-category" className="mt-3">
                    <Form.Label>Categoria Rosa</Form.Label>
                    <Form.Control size="lg" as="select">
                      <option>Rosa Rampicante</option>
                      <option>Rosa Perenne</option>
                      <option>Rosa Stagionale</option>
                      <option>Rosa Invernale</option>
                      <option>Rosa Estiva</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="rose-content" className="mt-3">
                    <Form.Label>Descrizione Rosa</Form.Label>
                    <ReactQuill value={text} onChange={handleChange} className="new-rose-content" />
                  </Form.Group>
                  <Form.Group controlId="photos" className="mt-3">
                    <Form.Label>Upload Foto</Form.Label>
                    <Form.Control 
                    type="file" 
                    multiple
                    onChange={(e) => setPhotos(e.target.files)} />
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
              </Container>
            }
            {displayEdit &&
              <Container className="edit-rose-container">
                Edit
              </Container>
            }
          </Container>

        </Page>
    )
}

export default Admin;