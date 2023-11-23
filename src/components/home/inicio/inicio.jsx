import "./inicio.css";
import brain from "../../../assets/compu.jpg";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
export const InicioInfo = () => {
  return (
    <>
      <div className="container box">
        <h1>Aplicacion ALICE</h1>
        
        <div className="container-carrusel">
          
        <Carousel className="carrusel-inicio">
        <Carousel.Item interval={1000}>
           <img src={"https://cdn.leonardo.ai/users/57cc7574-691e-4531-bb5c-eca066f8ec33/generations/ccda46d3-4c5c-45f6-9391-b59528bfc36c/Leonardo_Diffusion_XL_fomentar_la_innovacin_en_TI_en_beneficio_0.jpg"}  />
          <Carousel.Caption>
            <h3>ALICE</h3>
            <p className="text-carusel">Potencie su innovación con nuestro asistente virtual de IA, integrado con el Lean StartUp para impulsar la eficiencia y acelerar el desarrollo de productos."</p>
          </Carousel.Caption>
        </Carousel.Item>

      <Carousel.Item interval={500}>
         <img src={"https://cdn.leonardo.ai/users/57cc7574-691e-4531-bb5c-eca066f8ec33/generations/005cb29f-f3ec-435b-ad26-05877562fa0b/Leonardo_Diffusion_XL_Qu_es_la_innovacin_y_cmo_poner_en_marcha_0.jpg"}  />
        <Carousel.Caption>
          <h3>ALICE</h3>
          <p className="text-carusel"> "Transforme la forma en que innova: Descubra cómo nuestro asistente virtual en IA maximiza la agilidad del Lean StartUp, simplificando la toma de decisiones y optimizando resultados."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={"https://cdn.leonardo.ai/users/57cc7574-691e-4531-bb5c-eca066f8ec33/generations/12fcae7a-dd37-4fbd-bdd5-459f41e732f7/Leonardo_Diffusion_XL_Qu_es_innovacin_y_cmo_poner_en_marcha_un_0.jpg"}  />
        <Carousel.Caption>
          <h3>ALICE</h3>
          <p className="text-carusel">
          "Revolucione su proceso de desarrollo de productos con nuestra solución única: un asistente virtual inteligente diseñado para llevar la innovación al siguiente nivel bajo el enfoque probado del Lean StartUp."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   </div>

   <div className="info-top-inicio mb-5">
         
          <p>
          <h2>Que nos impulso a crear ALICE? </h2>
            Alice es una aplicación la cual fue creada con el objetivo de que los usuarios puedan tener una trazabilidad coherente en sus
            proyectos de Innovacion, lo que permitira que puedan seguir los pasos necesarios en una secuencia logica que evite que se creen
            incoherencias en el proceso de gestacion del proyecto de Innovacion.
            <div className="Acordion sombra">
    <Accordion className="Acordion-02">
      <Accordion.Item className="Acordion-03" eventKey="0">
        <Accordion.Header>Que es el framework lean StartUp?</Accordion.Header>
        <Accordion.Body className="Acordion-03">
            El framework o metodologia Lean Startup es un enfoque revolucionario para el desarrollo de negocios y la innovación que busca maximizar
            la eficiencia al tiempo que minimiza el desperdicio. En su núcleo, se basa en la aplicación de los principios lean a la creación de
            empresas, adoptando un ciclo de aprendizaje rápido y adaptativo. El framework Lean Startup, popularizado por Eric Ries, se centra en la
            construcción iterativa y el aprendizaje validado, alentando a los emprendedores a validar sus hipótesis de negocio a través de
            experimentos de manera ágil. Se compone de procesos como la creación de un MVP (Producto Mínimo Viable), la medición de resultados, y la
            adaptación continua a través de ciclos de construir-medir-aprender, permitiendo a las startups pivotar o perseverar en sus estrategias
            según la retroalimentación del mercado. Este enfoque no solo reduce el riesgo de fracaso al validar ideas de manera temprana, sino que
            también optimiza la asignación de recursos, acelerando así el camino hacia el desarrollo de productos exitosos.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="Acordion-03" eventKey="1">
        <Accordion.Header>Conoce mas sobre Lean StartUp</Accordion.Header>
        <Accordion.Body className="Acordion-03">
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/l9ET1WqRvSQ?si=BPSscomRMzxGowOQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="Acordion-03" eventKey="2">
        <Accordion.Header>Entragables que puedes realizar con Alice</Accordion.Header>
        <Accordion.Body className="Acordion-03"> 
        <p>
          En la presente web nos enfocamos en la fase de ideación del
          proyecto para ello se podra realizar los siguientes entregables:
        </p>
        <ul> * Mapa de empatía</ul>
        <ul> * Customer Journey map</ul>
        <ul> * User Research</ul>
        <ul> * User Persona</ul>
        <ul> * Mapa de arquetipos</ul>
        <ul> * Mapa de Afinidad</ul>
        <ul> * Brainstorming</ul>
        <ul> * Diagrama de Imagineria de Wall Disney</ul>
        <ul> * Mapa de Impacto</ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    </div>
          </p>
          
          <div className="sombra">
            <img src={brain} />
          </div>
        </div>
    
    
        {/* <h2>Que es el framework lean StartUp?</h2>
        <div className="Info lean">
          <p>
            El framework o metodologia Lean Startup es un enfoque revolucionario
            para el desarrollo de negocios y la innovación que busca maximizar
            la eficiencia al tiempo que minimiza el desperdicio. En su núcleo,
            se basa en la aplicación de los principios lean a la creación de
            empresas, adoptando un ciclo de aprendizaje rápido y adaptativo. El
            framework Lean Startup, popularizado por Eric Ries, se centra en la
            construcción iterativa y el aprendizaje validado, alentando a los
            emprendedores a validar sus hipótesis de negocio a través de
            experimentos de manera ágil. Se compone de procesos como la creación
            de un MVP (Producto Mínimo Viable), la medición de resultados, y la
            adaptación continua a través de ciclos de construir-medir-aprender,
            permitiendo a las startups pivotar o perseverar en sus estrategias
            según la retroalimentación del mercado. Este enfoque no solo reduce
            el riesgo de fracaso al validar ideas de manera temprana, sino que
            también optimiza la asignación de recursos, acelerando así el camino
            hacia el desarrollo de productos exitosos.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/l9ET1WqRvSQ?si=BPSscomRMzxGowOQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
       
        <h2>Que artefactos se Utilizaran en esta aplicación web</h2>
        <p>
          En el presente asistente nos enfocamos en la fase de ideación del
          proyecto para ello se podra realizar los siguientes entregables
        </p>
        <p> * Mapa de empatía</p>
        <p> * Customer Journey map</p>
        <p> * User Research</p>
        <p> * User Persona</p>
        <p> * Mapa de arquetipos</p>
        <p> * Mapa de Afinidad</p>
        <p> * Brainstorming</p>
        <p> * Diagrama de Imagineria de Wall Disney</p>
        <p> * Mapa de Impacto</p> */}
      </div>
    </>
  );
};
export default InicioInfo;
