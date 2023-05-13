import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
// eslint-disable-next-line
import {DndContext} from '@dnd-kit/core';
// eslint-disable-next-line
import {Droppable} from './Droppable';
// eslint-disable-next-line
import {Draggable} from './Draggable';
import DragArea from "./Drag/DragArea";


const FormRose = (props) => {
    const {data, onSubmit, handleChangeText, text, handleChangePhotos, hideFile, handleSetArrayPhotos, isLoading, photos} = props;
    const [title, setTitle] = useState(data ? data.title : '');
    const [category, setCategory] = useState(data ? data.category : '');
    const [price, setPrice] = useState(data ? data.price.$numberDecimal : 0);
    const [order, setOrder] = useState(data && data.order ? data.order : 0);
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(()=>{
        if(data && data.description)
            handleChangeText(data.description);
    // eslint-disable-next-line
    }, []);

    const handleDeletePhotoItem = (item) => {
        const new_photos = photos.filter((photo) => photo!==item);
        // setPhotosLocal(new_photos);
        handleSetArrayPhotos(new_photos);
        setDeleteMode(true);
    }
    const handleAddPhotoItem = (event) => {
        event.preventDefault();
        console.log('add');
        const photosInput = document.querySelector('#photosArray');
        photosInput.click();
    }
    return(
        <Form className="mt-1" onSubmit={onSubmit}>
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
            <Form.Group controlId="rose-order" className="mt-0">
                <Form.Label>Ordine</Form.Label>
                <Form.Control size="lg" 
                placeholder="Ordine" type="number" value={order} onChange={(e)=> setOrder(e.target.value)}/>
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
            {photos && photos.length > 0 &&
                <Form.Group controlId="photosArray">
                    <Form.Label>Foto</Form.Label>
                    {/* <div className="photos-container">
                    {
                        photos.map((item, idx)=>
                            <div key={`${item}_idx${idx}`} 
                            style={{position: 'relative', float: 'left', backgroundColor: '#080000', marginRight: "1em",}}>
                                <img src={item} alt={`${item}`} width="150"/>
                                <button style={{position: 'absolute', top: 0, right: 0}} 
                                onClick={()=> handleDeletePhotoItem(item)} >&times;</button>
                                <div style={{position: 'absolute', bottom: 1, left: 1, padding: '4px 6px 4px 6px', backgroundColor: '#FFC107'}}>{idx + 1}</div>
                            </div>
                        )
                    }
                        <div>
                            <button onClick={handleAddPhotoItem}disabled={deleteMode}>Aggiungi immagine</button>
                            <Form.Control
                            style={{display: 'none'}}
                            type="file" 
                            multiple
                            onChange={(e) => handleChangePhotos(e.target.files)} />
                        </div>
                    </div> */}
                    <DragArea dataItems={photos} 
                    handleDelete={handleDeletePhotoItem} handleSetArray={handleSetArrayPhotos}
                    isLoading={isLoading}/>
                    <div>
                        <button onClick={handleAddPhotoItem}disabled={deleteMode}>Aggiungi immagine</button>
                        <Form.Control
                        style={{display: 'none'}}
                        type="file" 
                        multiple
                        onChange={(e) => handleChangePhotos(e.target.files)} />
                    </div>
                </Form.Group>
            }
            <Form.Group className="d-flex mt-3 justify-content-end" style={{clear:'both'}}>
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