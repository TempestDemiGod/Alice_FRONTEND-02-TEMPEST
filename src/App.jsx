import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MenuMain } from './components/navbar/Navbar'
import  {Logeo} from './components/logeo/Logeo'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home}  from './components/home/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Brainstorming } from './components/mapasEquilibrados/brainstorming'
import Customer from './components/atefactos/customerMap/customerMap'
import Afinidad from './components/atefactos/mapaAfinidad/mapaAfinidad'
import Empatia from './components/atefactos/mapaEmpatia/mapaEmpatia'
import Impacto from './components/atefactos/mapaImpacto/mapaImpacto'
import UserResearch from './components/atefactos/userResearch/mapaUserResearch'
import UserPersona from './components/atefactos/UserPersona/mapaUserPersona'
import Sombrero from './components/atefactos/sombreros/mapaArquetipos'
import Disney from './components/atefactos/Disney/mapaDisney'
// import { Brainstorming } from './components/mapasEquilibrados/brainstorming'


function App(){
  const [mostrarMenu, setMostrarMenu] = useState(true)
  const logeo = () => {
    setMostrarMenu(!mostrarMenu)
  }
  return(
    <>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Logeo />
          } />
          <Route path="/Home" element={
            <Home />
          } />
          <Route path="/brainstorming" element={
            <Brainstorming />
          } />
          <Route path="/customer" element={
            <Customer />
          } />
          <Route path="/afinidad" element={
            <Afinidad />
          } />
          <Route path="/empatia" element={
            <Empatia />
          } />
          <Route path="/impacto" element={
            <Impacto />
          } />
          <Route path="/User-Research" element={
            <UserResearch />
          } />
          <Route path="/User-Persona" element={
            <UserPersona />
          } />
          <Route path="/Arquetipo" element={
            <Sombrero />
          } />
          <Route path="/Disney" element={
            <Disney />
          } />
          </Routes>
      </BrowserRouter>
    </>
  ) 
}



export default App
