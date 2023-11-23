import React, { useState, useEffect } from "react";
import Mermaid from "../../utils/Mermaid.jsx";
import "./brainstorming.css";
import Mapa from "./mainmappTab.jsx";
import { useLocation } from "react-router-dom";
import MenuMain from "../navbar/Navbar.jsx";
export const Brainstorming = () => {
  const location = useLocation();
    
  console.log(location.state);
  let apikey  = location.state.api
  let tema  = location.state.tema
  let id  = location.state.id
  let artefactos = location.state.Artefactos[6]
  let respuesta = artefactos.respuesta
  let ArtefactoID = artefactos._id
  console.log('chamoooo  '+ apikey)
  console.log('brain  ')
  return(
    <div className="contenedor-artefacto">
      <MenuMain />
      <div className="container">
        <h1 className="title-top">BRAINSTORMING</h1>
        <Mapa id={apikey} tema={tema} api={id} respuestaDB={respuesta} ArtecatoDB={ArtefactoID}/>
      </div>
    </div>
  ) 
}

export default Brainstorming