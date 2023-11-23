import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './projecto.css'
import empatia from '../../../assets/mapadeempatia.webp'
import customer from '../../../assets/customerjourney.webp'
import userResearch from '../../../assets/userresearch.jpg'
import userPersona from '../../../assets/user-persona.png'
import arquetipo from '../../../assets/arquetipo.png'
import afinidad from '../../../assets/afinidad.png'
import mapaIdeas from '../../../assets/brainstroming.png'
import disney from '../../../assets/waltdisney.jpg'
import impacto from '../../../assets/mapasimpacto.webp'
import { listadoArtefactos, listadoProject } from '../../../utils/artifact';
import { elimarProyecto } from '../../../utils/proyects';
export const HomeProject = ({api,tema ,nombre,id, cambiarEstado}) =>{
    const temaproyecto = tema
    const NombreProyecto = nombre.toUpperCase()
    const [Artefactos, setArtefactos] = useState([]);
    const getListArtifacts = async () => {
        try {
            const id = api
            const data ={
                id
            }
          const lista = await listadoArtefactos(data);
          console.log(lista.data)
          setArtefactos(lista.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        getListArtifacts();
      }, []);
      useEffect(() => {
        getListArtifacts();
      }, [temaproyecto]);

    const deletearProyecto = async()=> {
        let id =  api
        const data = {
            id
        }
        console.log(data)
        const res = await elimarProyecto(data)
        window.location.reload(false);
    }
    return(
        <>
            <section className="container mt-4 top-poject-contenedor">
                <div>
                    <h1 className='limite-proyecto nombre-proyecto'>PROYECTO : {NombreProyecto}</h1>
                    <h2 className='limite-proyecto tema-proyecto'>TEMA : {temaproyecto.toUpperCase()}</h2>
                </div>
                <div className='btn-contenedor'>
                    <button className='btn btn-outline-dark fs-3 me-4' onClick={()=>{cambiarEstado()}}>
                        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                    </button>
                    <button className='btn btn-outline-danger fs-3' onClick={()=> {
                        deletearProyecto()
                    }
                    }>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </section>
            <hr />
            <div className='row card-box container mt-5 mb-4'>
            <Link type="button" to={`/empatia`} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={empatia} />
            Mapa de empatía</Link>
            <Link type="button" to={`/customer`} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={customer} />
            Customer Journey map</Link>
            <Link to={`/User-Research`} type="button" className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={userResearch} />
            User research</Link> 
            <Link type="button" to={'/User-Persona'} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={userPersona} />
            User Persona</Link>
            <Link type="button" to={'/Arquetipo'} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src='https://images3.imgbox.com/3a/11/PWcL9Pib_o.png' />
            {/* {arquetipo} */}
            Tecnica de los 6 sombreros</Link>
            <Link type="button" to={`/afinidad`} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={afinidad} />
            Mapa de Afinidad</Link>        
            <Link type="button" to={`/brainstorming`} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={mapaIdeas} />
            brainstorming</Link>
            <Link to={'/Disney'} type="button" className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={disney} />
            Diagrama walt Disney</Link>
            <Link type="button" to={`/impacto`} className="card btn btn-outline-primary" state={{api,tema,id,Artefactos}}>
            <img src={impacto} />
            Mapa de Impacto</Link>
            </div>
            
        </>
    )
}

