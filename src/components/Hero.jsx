import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import logo from '../assets/logo.jpg';
import {ReactComponent as TitleLogo} from '../assets/mina-garden.svg';

const Hero = (props) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
    <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
            <div className="position-relative w-100">
                <img
                src={logo}
                className="d-inline-block align-top w-100"
                alt="Mina's logo"
                />
                <TitleLogo className="title-logo position-absolute fixed-bottom"></TitleLogo>
            </div>
            <p className="p-3 col-md-12 fs-4">
                {props.description}
                <span className="more-button fs-5" onClick={toggleReadMore} >
                    {!isReadMore ? ' [...mostra di più]' : ' [...mostra di meno]'}
                </span>
            </p>
            {isReadMore && 
                <p className="p-3 col-md-12 fs-4">{props.otherText}</p>
            }
            <Button as="Link" href={props.link} className="btn btn-primary btn-lg">{props.labelButton}</Button>
        </div>
    </div>
    )
}

export default Hero;