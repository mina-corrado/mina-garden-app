import React, {useState} from "react";
import { Button, Container, Form} from "react-bootstrap";
import "./styles.css";
import Page from "../components/Page";
import { useNavigate } from "react-router-dom";

const random = () => {
    return Math.ceil(Math.random() * 50);
}

const Registration = props => {
    const token = localStorage.getItem("token");
    const [validated, setValidated] = useState(false);
    const basepath = process.env.REACT_APP_BASE_PATH;
    const random1 = random();
    const random2 = random();
    const random3 = random();
    const total = random1 + random2 - random3;
    const navigate = useNavigate();

    const handleMath = (event) => {
        const number = Number(event.target.value);
        const button = document.querySelector('.registration-container [type="submit"]');
        if (total === number) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
        
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        // console.log(form);
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        const password = form.querySelector('#registration-form-password').value;
        const repassword = form.querySelector('#registration-form-re-password').value;

        if (password!==repassword){
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);
        const data = {
            cognome: form.querySelector('#registration-form-cognome').value,
            nome: form.querySelector('#registration-form-nome').value,
            data_di_nascita: form.querySelector('#registration-form-datadinascita').value,
            email: form.querySelector('#registration-form-username').value,
            password: form.querySelector('#registration-form-password').value
        };
        
        const headers = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
        fetch(`${basepath}/api/users`, headers).then(res=>res.json())
        .then(res=>{
            // reset
            form.querySelector('#registration-form-nome').value = '';
            form.querySelector('#registration-form-cognome').value = '';
            form.querySelector('#registration-form-datadinascita').value = '';
            form.querySelector('#registration-form-username').value = '';
            form.querySelector('#registration-form-password').value = '';
            form.querySelector('#registration-form-re-password').value = '';
            setValidated(false);
            console.log("success registration");
            navigate('/login');
        }, (err)=>{
            //gestione errore
            console.log(err);
        })
    };
    return (
        <Page>
        <Container className="registration-container">
            <Form noValidate validated={validated}  className="mt-5" onSubmit={onSubmit}>
                <Form.Group controlId="registration-form-cognome" className="mt-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control size="lg" placeholder="Cognome" required/>
                    <Form.Control.Feedback type="invalid">
                Inserisci un cognome.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registration-form-nome" className="mt-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control size="lg" placeholder="Nome" required/>
                    <Form.Control.Feedback type="invalid">
                Inserisci un nome.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registration-form-username" className="mt-3">
                    <Form.Label>Email (Username)</Form.Label>
                    <Form.Control size="lg" placeholder="Email (Username)" required/>
                    <Form.Control.Feedback type="invalid">
                Inserisci una email.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registration-form-datadinascita" className="mt-3">
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control size="lg" type="date" placeholder="Data di nascita" />
                </Form.Group>
                <Form.Group controlId="registration-form-password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="lg" placeholder="Password" minLength="8"  type="password" required/>
                    <Form.Control.Feedback type="invalid">
                Inserisci una password (minimo 8 caratteri).
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registration-form-re-password" className="mt-3">
                    <Form.Label>Reinserisci Password</Form.Label>
                    <Form.Control size="lg" placeholder="Password" minLength="8"  type="password" required/>
                    <Form.Control.Feedback type="invalid">
                Reinserisci la password (minimo 8 caratteri).
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registration-form-math" className="mt-3">
                    <Form.Label>Quanto fa <em>{random1}</em> + <em>{random2}</em> - <em>{random3}</em>?</Form.Label>
                    <Form.Control size="lg" placeholder="0" type="number" required onChange={handleMath}/>
                </Form.Group>
                
                <Form.Group className="d-flex mt-3 justify-content-end">
                    <Button
                    type="submit"
                    size="lg"
                    variant="dark"
                    style={{
                        marginLeft: "1em",
                    }}
                    disabled
                    >
                    Registrami
                    </Button>
                </Form.Group>
            </Form>
        </Container>
        </Page>
    )
}

export default Registration;