import Page from '../components/Page';
import TopRose from '../components/TopRose';

const Offerte = () => {
    return(
        <Page>
            <TopRose label='Le nostre Offerte' limit={8}></TopRose>
        </Page>
    )
}

export default Offerte;