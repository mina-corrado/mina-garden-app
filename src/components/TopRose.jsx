import React from "react";
import RoseListing from "./RoseListing";

const TopRose = (props) => {
    // const [topRose, setTopRose] = useState([]);
    // const basepath = process.env.REACT_APP_BASE_PATH;
    // const token = localStorage.getItem('token');

    // useEffect(()=>{
    //     const headers = {
    //         headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //         }
    //     }
    //     fetch(`${basepath}/api/roses?page=1&size=${props.limit}`, headers).then(res=>res.json())
    //     .then(res=>{
    //         // set
    //         const results = res.results;
    //         // console.log("RESULT ",results)
    //         setTopRose(results);
    //     }, (err)=>{
    //         //gestione errore
    //         console.log(err);
    //     })
    // },[]);

    return(
        // <Container className="top-container">
        //     <h2>La nostra selezione top</h2>
        //     {topRose.map((item) => <CardRose item={item} />)}
        // </Container>
        // <Container className="rose-listing">
        //     <h2>La nostra selezione top</h2>
        //     <Row>
        //     {
        //     topRose.map((rose) => <Col lg="6">
        //         <CardRose item={rose} hideFooter={true}></CardRose>
        //         </Col>)
        //     }
        //     </Row>
        // </Container>
        <RoseListing limit={props.limit} usePagination={false}>
            
                {props.label ? 
                    <h1>{props.label}</h1> 
                    : 
                    <h2>La nostra selezione top</h2>
                }
        </RoseListing>
    )
}

export default TopRose;