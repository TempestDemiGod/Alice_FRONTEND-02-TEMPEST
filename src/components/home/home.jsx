
import MenuMain from "../navbar/Navbar";
import imgAlice from "../../assets/Alice.png";
import "./home.css";

import { ModalProyect } from "../proyects/modalProyect";
import { useEffect, useState } from "react";

import { listado } from "../../utils/proyects";

import { HomeProject } from "./ProyectoHome/Proyecto";

import { InicioInfo } from "./inicio/inicio";
import Aos from "aos";
import 'aos/dist/aos.css'
import Brainstorming from "../mapasEquilibrados/brainstorming";
import { listadoProject } from "../../utils/artifact";


export const Home = () => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [proyectos, setProyecto] = useState([]);
  const [Inicio, cambiarInicio] = useState(false);
  const [IdProject, cambiarIdProject] = useState();
  const [ApiProject, cambiarApiProject] = useState();
  const [TemaProyecto, cambiarTemaProyecto] = useState();
  const [NombreProyecto, cambiarNombreProyecto] = useState();
  console.log(IdProject)

//   const obtenerProyecto = async() =>{
//     const idProject = IdProject
//     console.log('********************************')
//     console.log(idProject)
//     const data = {
//       idProject
//     }
//     let proyecto = await listadoProject(data)
//     console.log('dataaaa----   '+ proyecto.data.nombre)
//     cambiarTemaProyecto(proyecto.data.tema)
//     cambiarNombreProyecto(proyecto.data.nombre)
//     console.log(NombreProyecto)
// }
  async function ver(e){
    // console.log(e.target.id) 
    // console.log(proyectos[e.target.id]._id) 
    // await cambiarIdProject(proyectos[e.target.id]._id)
    console.log('proyecto seleccionado .. ' +proyectos[e.target.id].tema)
    cambiarIdProject(proyectos[e.target.id]._id)
    cambiarTemaProyecto(proyectos[e.target.id].tema)
    cambiarNombreProyecto(proyectos[e.target.id].nombre)
    cambiarApiProject(proyectos[e.target.id].apiKey)
    // await obtenerProyecto()
    await cambiarInicio(true)
  }
  useEffect(()=>{
    Aos.init()
  })

  const getNotes = async () => {
    try {
      const lista = await listado();
      setProyecto(lista.data);
      console.log(lista.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="total">
        <div className="contendor-second">
          <div className="navBar">
            <MenuMain />
          </div>
          <div className="contendor">
            <nav className="menu-projects">
              <div data-aos="fade-down" className="logo-home">
                <img src={imgAlice} />
              </div>
              <h1 className="title">ALICE</h1>
              <div className="projects">
                {proyectos?.map((proyecto, index) => {
                  return (
                    <button className="projectButton" onClick={async (e) =>
                      await ver(e)} key={proyecto._id} id={index}>
                      {proyecto.nombre}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => cambiarEstadoModal(true)}
                className="btn-addProject"
              >
                Agregar Proyecto
              </button>
            </nav>
            <div className="main-contenido">
              {Inicio ? <HomeProject api={IdProject} tema={TemaProyecto} nombre={NombreProyecto} id={ApiProject} cambiarEstado={() => cambiarInicio(false)}/> : <InicioInfo cambiarEstado={() => cambiarInicio(false)} />}
            </div>
            <div className="line"></div>
          </div>
        </div>
      </div>
      {/* <Brainstorming api ={IdProject} /> */}
      <ModalProyect
        estado={estadoModal}
        cambiarEstado={() => cambiarEstadoModal(false)}
      />
    </>
  );
};

export default Home;
