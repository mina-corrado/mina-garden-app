import React from "react";
import { Button } from "react-bootstrap";


const Hero = (props) => {
    return (
    <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">{props.title}</h1>
            <p className="col-md-8 fs-4">{props.description}</p>
            <Button as="Link" href={props.link} className="btn btn-primary btn-lg">{props.labelButton}</Button>
        </div>
    </div>
    )
}

export default Hero;