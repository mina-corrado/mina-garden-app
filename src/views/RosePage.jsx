import Page from '../components/Page';
import { useParams } from 'react-router-dom';
import Rose from '../components/Rose';

const RosePage = () => {
    let { roseId } = useParams();

    return(
        <Page>
            <Rose id={roseId}></Rose>
        </Page>
    )
}

export default RosePage;