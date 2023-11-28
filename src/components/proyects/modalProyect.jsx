import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { registerProject } from '../../utils/proyects';
import { useForm } from "react-hook-form";
import { registerArtifact } from '../../utils/artifact';
import './modalproyect.css'
export const ModalProyect = ({estado , cambiarEstado})=>{ 
  if(!estado) return ''

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset} = useForm({

  });

  const contra = useRef(null);
  contra.current = watch("password", "");
const listArtifacts = ['MapaEmpatia','CustomerJorneyMap','UserResearch','UserPersona','TecnicaSeisSomb','MapaAfinidad','Brainstorming','Disney','MapaImpacto']

  const forms = handleSubmit(async(data) => {
    console.log(data);
    cambiarEstado()
    const res = await registerProject(data)
    console.log('resultadoss ----')
    console.log(data)
    console.log(res)
    console.log(res.data._id)
    for(let i=0; i < listArtifacts.length ; i++){
      let respuesta = ''
      let prompt = ''
      let id = res.data._id
      let nombre = listArtifacts[i]
      const dataArfacto = {
        id,
        nombre,
        prompt,
        respuesta
      }
      const result = await registerArtifact(dataArfacto)
      console.log(result)
    }
    window.location.reload(false);
    reset();
  });
  // const [nombre, setNombre] = useState('')
  // const [tema, setTema] = useState('')
  // const [apiKey, setApikey] = useState('')
  // const [description, setDescription] = useState('')
  // const [estadoAgregar, setestadoAgregar] = useState("InActivo")
  // nombre != '' || 
  // const validacion  = () =>{
  //   // if(nombre  != '' && tema != '' && apiKey != ''){
  //   //   setestadoAgregar("Activo")
  //   // }else{
  //   //   setestadoAgregar("InActivo")
  //   // }
  //   if( 10 < nombre.length && 14 < tema.length && 10 < apiKey.length){
  //     console.log('nombre '+nombre+' -- tema '+tema+' -- api '+apiKey)
  //     setestadoAgregar("Activo")
  //   }else{
  //     setestadoAgregar("InActivo")
  //   }
    
  // }
  
  // const handleNombre = (e) => {
  //   setNombre(e.target.value)
  //   console.log(nombre);
  //   validacion()
  // }

  // const handleTema = (e) => {
  // setTema(e.target.value)
  // console.log(tema);
  // validacion()
  // }

  // const handleApikey = (e) => {
  //     setApikey(e.target.value)
  //     console.log(apiKey);
  //     validacion()
  // }
  
  // const handleDescription = (e) => {
  //     setDescription(e.target.value)
  //     console.log(description);
  // }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //       nombre,
  //       tema,
  //       apiKey,
  //       description
  //   }
  //   console.log(data)
  //   cambiarEstado()
  //   const res = await registerProject(data)
  //   console.log(data)
  //   console.log(res)
  //   window.location.reload(false);
  // };
    return(
    <>

      <Modal show={estado} onHide={cambiarEstado}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo Proyecto de Innovacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={forms}>
            <Form.Group className="mb-3" >
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Nombre del Proyecto"
                autoFocus
                {...register("nombre", { 
                  required: {
                    value: true,
                    message: "Nombre es requerido", 
                  },
                  minLength: {
                    value: 10,
                    message: "Nombre debe ser mayor a 10 caracteres",
                  },
                  pattern: {
                    // RegExp("^[a-zA-Z0-9_.+-@ñ]+[a-zA-Z0-9_.+-@ñ ]+$"),
                    value: RegExp("^[a-zA-Z0-9_.+-@ñóíéáú]+[a-zA-Z0-9_.+-@ñóíéáú ]+$"),
                    message: "El Nombre no puede iniciar con espacios",
                  },
                })}
                
              />
              {errors.nombre?.type === "required" && <span className='error'>Nombre requerido</span>}
              {errors.nombre?.type === "minLength" && (
                <span className='error'>Nombre debe ser mayor a 10 caracteres</span>
              )} 
              {errors.nombre?.type === "pattern" && (
                <span className='error'>Nombre no debe iniciar con espacios</span>
            )}  
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Tema</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sea preciso con el tema, ya que se usara como prompt"
                autoFocus
                {...register("tema", { 
                  required: {
                    value: true,
                    message: "Tema es requerido",
                  },
                  minLength: {
                    value: 10,
                    message: "Tema debe ser mayor a 10 caracteres",
                  },
                  pattern: {
                    // RegExp("^[a-zA-Z0-9_.+-@ñ]+[a-zA-Z0-9_.+-@ñ ]+$"),
                    value: RegExp("^[a-zA-Z0-9_.+-@ñóíéáú]+[a-zA-Z0-9_.+-@ñóíéáú ]+$"),
                    message: "El Tema no puede iniciar con espacios",
                  },
                })}
              />
              {errors.tema?.type === "required" && <span className='error'>Tema requerido</span>}
              {errors.tema?.type === "minLength" && (
                <span className='error'>Tema debe ser mayor a 10 caracteres</span>
              )}  
               {errors.tema?.type === "pattern" && (
                <span className='error'>Tema no debe iniciar con espacios</span>
            )}  

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>ApiKey</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su API Key de Open AI"
                autoFocus
                {...register("apiKey", {
                  required: {
                    value: true,
                    message: "El ApiKey es requerido",
                  },
                  minLength: {
                    value: 50,
                    message: "Apikey debe ser mayor a 50 caracteres",
                  },
                  maxLength: {
                    value: 53,
                    message: "Apikey no debe ser mayor a 53 caracteres",
                  },
                  pattern: {
                    value: RegExp("^[s]{1}[k]{1}[-]{1}[a-zA-Z0-9-]+$"),
                    message: "El Apikey no es valido debe comenzar con: sk- ",
                  },
      
                })}
              />
              
              {errors.apiKey?.type === "required" && <span className='error'>Api_Key es requerido</span>}
              {errors.apiKey?.type === "maxLength" && (
               <span className='error'>Api_Key no debe ser mayor a 53 caracteres</span>
               )}
               {errors.apiKey?.type === "minLength" && (
                <span className='error'>Api_Key debe ser mayor a 50 caracteres</span>
               )}
              {errors.apiKey?.type === "pattern" && (
                <span className='error'>Api_Key no es valido debe iniciar con sk-</span>
               )}  
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe el problema de invetigación, se preciso y con pocas palabras"
                autoFocus
                {...register("description", {
                  required: {
                    value: true,
                    message: "La descripción es requerida",
                  },
                  maxLength: {
                    value: 150,
                    message: "La descripción no debe ser mayor a 150 caracteres",
                  },

                })}

              />

              {errors.description?.type === "required" && <span className='error'>Descripción requerida</span>}
              {errors.description?.type === "maxLength" && (
                <span className='error'>Descripción no debe ser mayor a 150 caracteres</span>
              )}
            </Form.Group>
     
    
          <div id="buttons-form">
                <Button className="me-4" variant="secondary" onClick={cambiarEstado}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                Agregar Proyecto
              </Button>
          </div>  
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
}
