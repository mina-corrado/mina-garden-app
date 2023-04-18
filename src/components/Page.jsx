import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';

const Page = (props) => {
    return(
    <>
        <header>
            <TopNavbar></TopNavbar>
        </header>
        <main>
            {props.children}
        </main>
        <footer className='bg-dark'>
            <BottomNavbar></BottomNavbar>
        </footer>
    </>
    )
}

export default Page;