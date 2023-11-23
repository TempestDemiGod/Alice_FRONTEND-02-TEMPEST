import React, { useState, useEffect } from "react";
import "../../mapasEquilibrados/brainstorming.css";
import { useLocation } from "react-router-dom";
import MenuMain from "../../navbar/Navbar.jsx";
import MapUserPersona from "./mainMapUserPersona.jsx";
export const UserPersona = () => {
  const location = useLocation();
    
  console.log(location.state);
  let apikey  = location.state.api
  let tema  = location.state.tema
  let id  = location.state.id
  let artefactos = location.state.Artefactos[3]
  let respuesta = artefactos.respuesta
  let ArtefactoID = artefactos._id
  console.log('chamoooo  '+ apikey)
  console.log('brain  ')
  return(
    <div className="contenedor-artefacto">
       <MenuMain />
       <div className="container">
      <h1 className="title-top">USER PERSONA</h1>
      <MapUserPersona id={apikey} tema={tema} api={id} respuestaDB={respuesta} ArtecatoDB={ArtefactoID}/>
    </div>
    </div>
     
  ) 
}

export default UserPersona