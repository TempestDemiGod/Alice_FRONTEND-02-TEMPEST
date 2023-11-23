import React, { useState, useEffect } from "react";
import "../../mapasEquilibrados/brainstorming.css";
import { useLocation } from "react-router-dom";
import MapaEmpatia from "./mainmapEmpatia.jsx";
import MenuMain from "../../navbar/Navbar.jsx";
export const Empatia = () => {
  const location = useLocation();
    
  console.log(location.state);
  let apikey  = location.state.api
  let tema  = location.state.tema
  let id  = location.state.id
  let artefactos = location.state.Artefactos[0]
  let respuesta = artefactos.respuesta
  let ArtefactoID = artefactos._id
  console.log('chamoooo  '+ apikey)
  console.log(ArtefactoID)
  console.log('brain  ')
  console.log(artefactos)
  return(
    <div className="contenedor-artefacto">
       <MenuMain />
       <div className="container">
      <h1 className="title-top">MAPA DE EMPATIA</h1>
      <MapaEmpatia id={apikey} tema={tema} api={id} respuestaDB={respuesta} ArtecatoDB={ArtefactoID} />
    </div>
    </div>
     
  ) 
}

export default Empatia