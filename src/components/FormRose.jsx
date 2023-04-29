import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";

const FormRose = (props) => {
    const {data, onSubmit, handleChangeText, text, handleChangePhotos, hideFile} = props;
    const [title, setTitle] = useState(data ? data.title : '');
    const [category, setCategory] = useState(data ? data.category : '');
    const [price, setPrice] = useState(data ? data.price : 0);

    useEffect(()=>{
        if(data && data.description)
            handleChangeText(data.description);
    },[data, handleChangeText])
    
    return(
        <Form className="mt-0" onSubmit={onSubmit}>
            <Form.Group controlId="rose-form" className="mt-0">
                <Form.Label>Titolo Rosa</Form.Label>
                <Form.Control size="lg" 
                placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="rose-category" className="mt-3">
                <Form.Label>Categoria Rosa</Form.Label>
                <Form.Control size="lg" as="select" onChange={(e)=>setCategory(e.target.value)} value={category}>
                    <option>Rosa Rampicante</option>
                    <option>Rosa Perenne</option>
                    <option>Rosa Stagionale</option>
                    <option>Rosa Invernale</option>
                    <option>Rosa Estiva</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="rose-price" className="mt-0">
                <Form.Label>Prezzo (EUR)</Form.Label>
                <Form.Control size="lg" 
                placeholder="Prezzo" type="number" value={price} onChange={(e)=> setPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="rose-content" className="mt-3">
                <Form.Label>Descrizione Rosa</Form.Label>
                <ReactQuill value={text} onChange={handleChangeText} className="new-rose-content" />
            </Form.Group>
            {!hideFile &&
                <Form.Group controlId="photos" className="mt-3">
                    <Form.Label>Upload Foto</Form.Label>
                    <Form.Control 
                    type="file" 
                    multiple
                    onChange={(e) => handleChangePhotos(e.target.files)} />
                </Form.Group>
            }
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
    )
}

export default FormRose;