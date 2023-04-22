import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CardRose = (props) => {
  const {_id, title, description, category, photos} = props.item;
  const markupDescr = { __html: description };
  const hideFooter = !!props.hideFooter;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalogo/${_id}`);
  }

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
            <Button variant="primary">Aggiungi</Button>
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