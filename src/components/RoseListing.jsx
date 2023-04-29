import React, { useEffect, useState } from "react";
import CardRose from "./CardRose";
import RoseListingPagination from "./RoseListingPagination";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
import { useNavigate } from 'react-router-dom';

const RoseListing = (props) => {
  const [roses, setRoses] = useState([]);
  const [page, setPage] = useState(props.pageNum);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const basepath = process.env.REACT_APP_BASE_PATH;
  const token = localStorage.getItem('token');

  const {usePagination, children} = props;
  const navigate = useNavigate();

  useEffect(()=>{
      setLoading(true);
      const headers = {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          }
      }
      fetch(`${basepath}/api/roses?page=${page}&size=${props.limit}`, headers).then(res=>res.json())
      .then(res=>{
          // set
          setLoading(false);
          const results = res.results;
          console.log("RESULT ",results);
          setRoses(results);
          setCount(res.count);
          window.scrollTo({top: 0});
      }, (err)=>{
          //gestione errore
          console.log(err);
      })
  },[page, basepath, token, props.limit]);

  const handlePageChange = (page) => {
    setPage(page);
    navigate(`/catalogo/page/${page}`);
  }

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <>
    <Container className="rose-listing">
      {children}
      <Row>
      {
      roses.map((rose) => <Col key={rose._id} lg="6">
        <CardRose item={rose} hideFooter={true}></CardRose>
        </Col>)
      }
      {usePagination &&
        <RoseListingPagination 
          page={page} 
          count={Math.ceil(count/props.limit)}
          handlePage={(aPage) => handlePageChange(aPage)} 
        />
      }
      </Row>
    </Container>
    </>
  );
}

export default RoseListing;