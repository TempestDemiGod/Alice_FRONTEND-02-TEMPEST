import React, { useState, useEffect } from "react";

import "../../mapasEquilibrados/brainstorming.css";
import { useLocation } from "react-router-dom";
import MapaImpacto from "./mainmapImpacto.jsx";
import MenuMain from "../../navbar/Navbar.jsx";
export const Impacto = () => {
  const location = useLocation();
    
  console.log(location.state);
  let apikey  = location.state.api
  let tema  = location.state.tema
  let id  = location.state.id
  let artefactos = location.state.Artefactos[8]
  let respuesta = artefactos.respuesta
  let ArtefactoID = artefactos._id
  console.log('chamoooo  '+ apikey)
  console.log('brain  ')
  return(
    <div className="contenedor-artefacto">
       <MenuMain />
      <div className="user-lol">
      <h1 className="title-top">MAPA DE IMPACTO</h1>
      <MapaImpacto id={apikey} tema={tema} api={id} respuestaDB={respuesta} ArtecatoDB={ArtefactoID}/>
    </div>
    </div>
  ) 
}

export default Impacto