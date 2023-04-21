import { Card, Button } from 'react-bootstrap';

const CardRose = (props) => {
  const {title, description, category, photos} = props.item;
  const markupDescr = { __html: description };

  return (
    <>
      <Card>
        <div className='card-horizontal'>
          <Card.Img variant="top" src={photos[0]} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={markupDescr}>
            </Card.Text>
            <Button variant="primary">Aggiungi</Button>
          </Card.Body>
        </div>
        <Card.Footer>{category}</Card.Footer>
      </Card>
    </>
  );
}

export default CardRose;