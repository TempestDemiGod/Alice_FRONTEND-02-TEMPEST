import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./login.css";
import {Link} from 'react-router-dom'
import { login } from "../../../utils/auth";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
export const LoginMain = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function showMessage(message,type){
      Toastify({
        text: message,
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:type === 'success' ?"linear-gradient(to right, #00b09b, #96c93d)": 'red'
        },
        onClick: function(){} // Callback after click
    }).showToast();
    }
    
    const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(email);
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
        console.log(email);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
          const data = {
            email,
            password
        }
        const res = await login(data)
        console.log(res)
        if(res.status == 200 ){
          window.location.href = "/Home";
        }else{
          throw true;
        }
        }catch(error){
          showMessage('Credenciales de Usuario Incorrectas','error')
          
        }
        
      };
  return (
    <>
      <section className="contenedor-form hola-01">
        <h1>Bienvenidos a Alice</h1>
        <br/>
       <Form>
       <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
             Email
            </Form.Label>
        <Col sm="10">
            <Form.Control onChange={(e) => handleEmail(e)} placeholder="email@example.com" />
        </Col>
        </Form.Group>

       <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
       <Form.Label column sm="2">
        Password
       </Form.Label>
       <Col sm="10">
          <Form.Control onChange={(e) => handlePassword(e)} type="password" placeholder="Password" />
         </Col>
      </Form.Group>
      <button className="btn-logeo" type='submit' onClick={(e) => onSubmit(e)}>Ingresar</button>
     </Form>
     </section>
     </>
  );
};

 

