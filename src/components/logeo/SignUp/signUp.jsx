import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./signUp.css";
import { useRef, useState } from 'react';
import { registerUser } from '../../../utils/auth';
import { useForm } from "react-hook-form";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const RegistroMain = () => {
  const [registroActual,setregistroActual] = useState(false)

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
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset} = useForm({

  });

  const contra = useRef(null);
  contra.current = watch("password", "");

  const forms = handleSubmit(async(data) => {
    console.log(data);
    try{ 
      setregistroActual(true)
      const res = await registerUser(data)
      console.log(data)
      console.log(res)
      if(res.status == 201 ){
        setregistroActual(false)
          window.location.href = "/Home";
      }else{
        throw true;
      }
      }catch(error){
        showMessage('El correo Ingresado ya esta en Uso','error')
        
      }
    reset();
  });

  // const [nombre, setNombre] = useState('')
  // const [apellido, setApellido] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  

  // const handleNombre = (e) => {
  //   setNombre(e.target.value)
  //   console.log(email);
  // }

  // const handleApellido = (e) => {
  // setApellido(e.target.value)
  // console.log(email);
  // }

  // const handleEmail = (e) => {
  //     setEmail(e.target.value)
  //     console.log(email);
  // }
  
  // const handlePassword = (e) => {
  //     setPassword(e.target.value)
  //     console.log(email);
  // }

  // const onSubmit = async (e) => {
  //     e.preventDefault();
  //     const data = {
  //         nombre,
  //         apellido,
  //         email,
  //         password
  //     }
  //     const res = await registerUser(data)
  //     console.log(data)
  //     console.log(res)
  //       if(res.status == 201 ){
  //         window.location.href = "/Home";
  //       }
  //   };


    return (
    <div className='contenedor-registro'>
        <section className="contenedor-form hola-02">
        <h1>Registrate Con Nosotros</h1>
        <hr/>
        <Form onSubmit={forms}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          name='nombre'       
          type="Text" 
          placeholder="nombre"
          {...register("nombre", { 
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "Nombre debe ser mayor a 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El nombre no debe tener mas de 20 caracteres",
            
          },
            pattern: {
              value: RegExp("^[a-zA-Zñóíéáú]+[a-zA-Zñóíéáú ]+$"),
              message: "El nombre no puede ser numerico o iniciar con espacios",
            },

        })}
          />

         {errors.nombre?.type === "required" && <span className='error'>Nombre requerido</span>}
         {errors.nombre?.type === "maxLength" && (
          <span className='error'>Nombre no debe ser mayor a 20 caracteres</span>
        )}
        {errors.nombre?.type === "minLength" && (
          <span className='error'>Nombre debe ser mayor a 2 caracteres</span>
        )}  
         {errors.nombre?.type === "pattern" && (
          <span className='error'>Nombre no puede tener numeros o iniciar con espacios</span>
        )} 

      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          name='apellido'
          type="Text" 
          placeholder="Apellido" 
          {...register("apellido", {
            required: {
              value: true,
              message: "El Apellido es requerido",
            },
            minLength: {
              value: 2,
              message: "Apellido debe ser mayor a 2 caracteres",
            },
            maxLength: {
              value: 20,
              message: "Apellido no debe ser mayor a 20 caracteres",
            },
            pattern: {
              value: RegExp("^[a-zA-Zñóíéáú]+[a-zA-Zñóíéáú ]+$"),
              message: "El Apellido no puede ser numerico",
            },
            
          })}
          />
          {errors.apellido?.type === "required" && <span className='error'>Apellido es requerido</span>}
          {errors.apellido?.type === "maxLength" && (
             <span className='error'>Apellido no debe ser mayor a 20 caracteres</span>
           )}
          {errors.apellido?.type === "minLength" && (
          <span className='error'>Apellido debe ser mayor a 2 caracteres</span>
           )}
          {errors.apellido?.type === "pattern" && (
          <span className='error'>Apellido no puede tener numeros o iniciar con espacios</span>
        )}  
          


      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Correo</Form.Label>
        <Form.Control 
          type="Text" 
          placeholder="Correo"

          {...register("email", {
            required: {
              value: true,
              message: "Correo es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Correo no válido",
            },
          })}
          />
          {errors.email && <span className='error'>{errors.email.message}</span>}

      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
         type="password" 
         placeholder="Password"
         {...register("password", {
          required: {
            value: true,
            message: "Contraseña es requerida",
          },
          minLength: {
            value: 6,
            message: "Contraseña debe ser mayor a 6 caracteres",
          }, 
          maxLength: {
            value: 12,
            message: "Contraseña no debe tener mas de 12 caracteres",
            
          },
          pattern: {
            value: RegExp("^[a-zA-Zñóíéáú0-9_.+-@ñ]+[a-zA-Zñóíéáú0-9_.+-@ñ ]+$"),
            message: "La contraseña no puede iniciar con espacios",
          },

        })}

         />

        {errors.password && <span className='error'>{errors.password.message}</span>}
        
      </Form.Group>

      <Button variant="primary" disabled={registroActual} type="submit">
        Registrate
      </Button>
    </Form>
        </section>
    </div>
  );
};

  

 

