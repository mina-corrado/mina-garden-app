import Page from '../components/Page';
import RoseListing from '../components/RoseListing';
import { useParams } from 'react-router-dom';
import "./styles.css";


const Catalog = () => {
    let { pageNum = 1 } = useParams();
    return(
        <Page>
            <RoseListing limit={10} usePagination={true} pageNum={pageNum}>
                <h1>Le nostre Rose</h1>
            </RoseListing>
        </Page>
    )
}

export default Catalog;