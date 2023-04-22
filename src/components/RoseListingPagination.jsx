import { Pagination } from "react-bootstrap";

const RoseListingPagination = (props) => {
    const {page, count, handlePage} = props;

    let items = [];
    for (let number = 1; number <= count; number++) {
        items.push(
            <Pagination.Item 
                key={number} 
                active={number === page} 
                activeLabel=""
                onClick={() => handlePage(number)}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination size="md" style={{justifyContent: 'center'}}>{items}</Pagination>
    )
}

export default RoseListingPagination;