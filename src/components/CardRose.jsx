import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AddButton from "./AddButton";
import { useContext, useEffect } from 'react';
import { OrderContext } from '../context/Context';

const CardRose = (props) => {
  const {_id, title, description, category, photos, price} = props.item;
  const markupDescr = { __html: description };
  const hideFooter = !!props.hideFooter;

  const navigate = useNavigate();
  const {order, setOrder} = useContext(OrderContext);

  const handleClick = () => {
    navigate(`/catalogo/${_id}`);
  }

  const handleAddClick = () => {
    const newItem = {
      title,
      price,
      quantity: 1,
    }

    const existingItem = order.find((el) => el.title === newItem.title);
    if (existingItem) {
      existingItem.quantity++;
      setOrder((prev) => [...prev.map((item) => 
        item.title === existingItem.title ? 
        existingItem 
        :
        item
      )]);
    } else {
      setOrder((prev) => [...prev, newItem]);
    }
  }

  useEffect(()=>{
    console.log('order change! ', order)
  }, [order]);
  
  return (
    <>
      <Card>
        <div className='card-horizontal'>
          <Card.Img variant="top" src={photos[0]} onClick={handleClick}/>
          <Card.Body>
            <Card.Title>
              <Card.Link href={`/catalogo/${_id}`}>{title}</Card.Link>
            </Card.Title>
            <Card.Text dangerouslySetInnerHTML={markupDescr}>
            </Card.Text>
            <p className='mt-0'>
              Prezzo: <strong>{price} EUR</strong>
            </p>
            <AddButton onClick={handleAddClick}></AddButton>
          </Card.Body>
        </div>
        {!hideFooter && 
          <Card.Footer>{category}</Card.Footer>
        }
      </Card>
    </>
  );
}

export default CardRose;