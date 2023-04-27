import { useContext } from 'react';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import { OrderContext } from '../context/Context';

const Page = (props) => {
    const {order} = useContext(OrderContext);
    const qty = order.reduce((acc, item) => { return acc + item.quantity; }, 0);
    return(
    <>
        <header>
            <TopNavbar items={qty}></TopNavbar>
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