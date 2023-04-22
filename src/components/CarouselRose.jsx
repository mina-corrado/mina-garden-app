import Carousel from 'react-bootstrap/Carousel';

const CarouselRose = (props) => {
  const {items, title} = props;
  return (
    <Carousel fade interval={null} className='roseCarousel'>
      {
      items.map((item, index) => 
        <Carousel.Item key={item} className='roseCarouselItem'>
          <img
            className="d-block w-100"
            src={item}
            alt={`#${index} slide`}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default CarouselRose;