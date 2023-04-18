import React, { useCallback, useState } from "react";
import Page from '../components/Page';
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const Admin = () => {
    const [text, setText] = useState("");
    const handleChange = useCallback(value => {
      setText(value);
    });
  
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
        content: text
      };
      const headers = {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify(data)
      }
  
      fetch('/api/roses', headers).then(res=>res.json())
      .then(res=>{
        // reset
        form.querySelector('#rose-form').value = '';
        form.querySelector('#rose-category').value = '';
        setText('');
      }, (err)=>{
          //gestione errore
          console.log(err);
      })
    }

    return(
        <Page>
            {/* <Button as='Link' href='/newRose'></Button> */}


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
  

        </Page>
    )
}

export default Admin;