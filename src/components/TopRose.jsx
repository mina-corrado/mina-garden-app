import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CardRose from './CardRose';

const TopRose = (props) => {
    const [topRose, setTopRose] = useState([]);
    const basepath = process.env.REACT_APP_BASE_PATH;
    const token = localStorage.getItem('token');

    useEffect(()=>{
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            }
        }
        fetch(`${basepath}/api/roses?page=1&size=${props.limit}`, headers).then(res=>res.json())
        .then(res=>{
            // set
            const results = res.results;
            console.log("RESULT ",results)
            setTopRose(results);
        }, (err)=>{
            //gestione errore
            console.log(err);
        })
    },[]);

    return(
        <Container>
            <h2>La nostra selezione top</h2>
            {topRose.map((item) => <CardRose item={item} />)}
        </Container>
    )
}

export default TopRose;