import Hero from '../components/Hero';
import Page from '../components/Page';

const Home = () => {
    return(
        <Page>
            <Hero title="Mina's Rose Garden" 
                description="Benvenuti nel mio Vivaio! Questo sito non vuole essere soltanto un sito che vende rose e rosai ma un sito che offre un esperienza prima di tutto sensoriale, unica, mistica." 
                labelButton="Vai alle offerte" link="/" ></Hero>
        </Page>
    )
}

export default Home;