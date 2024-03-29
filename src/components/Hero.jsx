import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from '../assets/logo.jpg';
import {ReactComponent as TitleLogo} from '../assets/mina-garden.svg';
import {ReactComponent as MottoLogo} from '../assets/motto.svg';

const Hero = (props) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
    <div className="p-xs-1 p-lg-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
            <div className="position-relative w-100">
                <MottoLogo className="title-logo position-absolute fixed-top"></MottoLogo>
                <img
                    src={logo}
                    className="d-inline-block align-top w-100"
                    alt="Mina's logo"
                />
                <TitleLogo className="title-logo position-absolute fixed-bottom"></TitleLogo>
            </div>
            <p className="p-3 col-md-12 fs-4 text-justify">
                {props.description}
                <span className="more-button fs-5" onClick={toggleReadMore} >
                    {!isReadMore ? ' [...mostra di più]' : ' [...mostra di meno]'}
                </span>
            </p>
            {isReadMore && 
                <p className="p-3 col-md-12 fs-4 text-justify">{props.otherText}</p>
            }
            <Button as={Link} to={props.link} className="btn btn-primary btn-lg">{props.labelButton}</Button>
        </div>
    </div>
    )
}

export default Hero;