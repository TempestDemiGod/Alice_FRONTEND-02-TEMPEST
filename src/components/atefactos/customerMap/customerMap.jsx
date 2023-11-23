import React, { useState, useEffect } from "react";
// import "./brainstorming.css";
import { useLocation } from "react-router-dom";
import MapaCustomer from "./mainmapCustomer.jsx";
import MenuMain from "../../navbar/Navbar.jsx";
export const Customer = () => {
  const location = useLocation();
    
  console.log(location.state);
  let apikey  = location.state.api
  let tema  = location.state.tema
  let id  = location.state.id
  let artefactos = location.state.Artefactos[1]
  let respuesta = artefactos.respuesta
  let ArtefactoID = artefactos._id
  console.log('chamoooo  '+ apikey)
  console.log('brain  ')
  return(
    <div className="contenedor-artefacto">
      <MenuMain />
      <div className="container">
      <h1 className="title-top">CUSTOMER JOURNEY MAP</h1>
      <MapaCustomer id={apikey} tema={tema} api={id}  respuestaDB={respuesta} ArtecatoDB={ArtefactoID}/>
    </div>
    </div>
     
  ) 
}

export default Customer


