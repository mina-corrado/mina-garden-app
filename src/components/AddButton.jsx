import { Button } from "react-bootstrap";

const AddButton = (props) => {
    const {className, onClick} = props;

    return(
        <Button variant="primary" onClick={onClick} className={className}>Aggiungi</Button>
    )
}

export default AddButton;