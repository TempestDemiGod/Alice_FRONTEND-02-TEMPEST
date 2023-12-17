import React, { useState, useEffect } from "react";
import Mermaid from "../../../utils/Mermaid";
import { UpDateArtifact, listadoProject, registerArtifact } from '../../../utils/artifact';
// import { listado } from "../../utils/proyects";
import Typewriter from 'typewriter-effect';


let idProject
let apikey
let temaproyecto
let respuestaObtenida
let respuestaArtefactoID

function showMessage(message,type){
  Toastify({
    text: message,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:type === 'success' ?"linear-gradient(to right, #00b09b, #96c93d)": 'red'
    },
    onClick: function(){} // Callback after click
}).showToast();
}

async function verProyecto(){
  const data = {
    idProject
}
  let proyecto = await listadoProject(data)
  console.log('funco')
  console.log(typeof(proyecto))
  console.log(proyecto)
  apikey = proyecto.data.apiKey
  temaproyecto = proyecto.data.tema
  console.log(proyecto.data.apiKey)
  console.log(proyecto.data.tema)
}
function MindmappingTab({ prompt, setPrompt, result, setResult, callOpenAi }) {
  // const getTema = async () => {
  //   try {
  //     const tema = await listado();
  //     setProyecto(tema.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
    
  //   getTema();

  // }, []);


  // const [nombre, setNombre] = useState('')
  // const [prompts, setPrompts] = useState('')
  // const [respuesta, setRespuesta] = useState('')

  // const handleNombre = (e) => {
  //   setNombre(e.target.value)
  //   console.log(nombre);
  // }

  // const handlePrompts = (e) => {
  // setPrompts(e.target.value)
  // console.log(prompts);
  // }

  // const handleRespuesta = (e) => {
  //     setRespuesta(e.target.value)
  //     console.log(respuesta);
  // }

  // const onSubmit = async (e) => {
  //     e.preventDefault();
  //     const data = {
  //         nombre,
  //         prompts,
  //         respuesta,
          
  //     }
  //     const res = await registerArtifact(data)
  //     console.log(data)
  //     console.log(res)
  //   };

  return (
    <div className="App lol">
      <div className="outer parametros-textos">
        <div className="text-extendido-textos">
          <div>Prompt de entrada</div>
          <div className="textarea text-extendido  salida-extendido-textos">
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button  className="btn form-control btn btn-dark mt-4 mb-4" onClick={() => callOpenAi()}>Generar Artefacto</button>
        <div className="text-extendido-textos pb-4">
          <div>Salida</div>
          <div className="textarea text-extendido">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      
    </div>
  );
}

function SettingsTab({
  token,
  setToken,
  model,
  setModel,
  // promptTemplate,
  // setPromptTemplate,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature
}) {
  // const handlePromptTemplateChange = (e) => {
  //   setPromptTemplate(e.target.value);
  //   localStorage.setItem("promptTemplate", e.target.value);
  // };

  function extractIntFromString(str) {
    const result = str.match(/\d+/);
    if (result) {
      return parseInt(result[0], 10);
    } else {
      return 0;
    }
  };
console.log('funciono chamo .. ' + idProject)
  function extractFloatFromString(str) {
    str = str.replace(',', '.'); // Reemplazar coma con punto como separador decimal
    const result = str.match(/^-?(\d+)?(\.\d*)?/); // Une dígitos opcionales antes y después del punto decimal
    if (result) {
      return result[0] === '' ? '0' : result[0]; // Devuelve '0' si la entrada es una cadena vacía
    } else {
      return '0';
    }
  }

  const handleMaxTokensChange = (e) => {
    let maxTokens = extractIntFromString(e.target.value);
    setMaxTokens(maxTokens);
    localStorage.setItem("maxTokens", maxTokens);
  };

  const handleTemperatureChange = (e) => {
    let temperate = extractFloatFromString(e.target.value);
    setTemperature(temperate);
    localStorage.setItem("temperate", temperate);
  };

  return (
    <div className="text-dark">
      <h1 className="mt-4 mb-3 "><i className="fa fa-cog " aria-hidden="true"></i> Configuraciones</h1>
      <div>OpenAI API_KEY</div>
      <div>
        <input
          type="password"
          id="token"
          className="form-control bg-dark text-white mb-3"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="model">Motor GPT:</label>
        <select
          name="model"
          className="form-control bg-dark text-white mb-3"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
        </select>
      </div>

      <div>
        <label htmlFor="maxTokens">Max de Tokens a usar:</label>
        <input
          type="text"
          className="form-control bg-dark text-white mb-3"
          id="maxTokens"
          name="maxTokens"
          value={maxTokens}
          onChange={handleMaxTokensChange}
        />
      </div>

      <div>
        <label htmlFor="temperature">Temperatura:</label>
        <input
          type="text"
          className="form-control bg-dark text-white mb-3"
          id="temperature"
          name="temperature"
          value={temperature}
          onChange={handleTemperatureChange}
        />
      </div>

      {/* <div>
        <label htmlFor="promptTemplate">Prompt Template:</label>
        <textarea
          type="text"
          className="form-control bg-dark text-white mb-3"
          id="promptTemplate"
          name="promptTemplate"
          value={promptTemplate}
          onChange={handlePromptTemplateChange}
        />
      </div> */}
    </div>
  );
}

export default function MapaSombrero({id,tema,api,respuestaDB,ArtecatoDB}) {
  
  useEffect(() => {
    idProject = id
    apikey= api
    temaproyecto = tema
    respuestaObtenida = respuestaDB
    respuestaArtefactoID  = ArtecatoDB
    // verProyecto()
    setToken(apikey)
  },[]);
  useEffect(() => {
    setPrompt(temaproyecto)
    setResult(respuestaObtenida)
  },[]);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [modalConfig, setModalConfig] = useState(true);
  const [activeTab, setActiveTab] = useState("Mindmapping");
  const [token, setToken] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [maxTokens, setMaxTokens] = useState(
    localStorage.getItem("maxTokens") || 3000
  );
  let respuesta = result
  let promptGlobal
  if(prompt == '' ){
    promptGlobal = temaproyecto
  }else{
    promptGlobal = prompt
  } 
  
  async function guardarMapa(){
    let prompt = promptGlobal
    let id = idProject
    let nombre = 'Mapa seis sombreros'
    let idArtefacto = respuestaArtefactoID 
    console.log('idArtefacto')
    console.log(idArtefacto)
    const data = {
      idArtefacto,
      respuesta
  }
  console.log(data)
  const result = await UpDateArtifact(data)
  if(result.status == 202){
    showMessage(`El artefacto ${nombre} se guardo con Exito`,'success')
  }
  }
  const [temperature, setTemperature] = useState(
    localStorage.getItem("temperature") || 0.7
  );

  // const [promptTemplate, setPromptTemplate] = useState(
  //   localStorage.getItem("promptTemplate") ||
  //     `Usa la tecnica de los 6 sombreros basado en las aportaciones del usuario como estos ejemplos:

  //     Tecnica de los seis sombreros para pensar:
  //     \t\tSombrero Blanco (Hechos y Datos):
  //     \t\t\t\tContamos con datos objetivos que respaldan nuestra estrategia en Lean Startup, como el rápido aumento en la adopción de asistentes virtuales en entornos empresariales, según estudios de mercado recientes.
  //     \t\t\t\tLas métricas de negocio respaldan nuestro enfoque actual, ya que hemos experimentado una mejora del 30% en la eficiencia del equipo desde la implementación del asistente virtual.
  //     \t\t\t\tLa evidencia concreta de que nuestra hipótesis está siendo validada se refleja en la reducción del tiempo dedicado a tareas administrativas, liberando recursos para actividades más estratégicas.
  //     \t\tSombrero Rojo (Emociones e Intuición):
  //     \t\t\t\tEl equipo se siente entusiasmado y motivado por la dirección actual del proyecto en Lean Startup, ya que ven resultados tangibles que mejoran su día a día.
  //     \t\t\t\tLa intuición general es positiva, respaldada por la retroalimentación emocional del equipo, quienes perciben el asistente virtual como una herramienta valiosa para la gestión de proyectos.
  //     \t\t\t\tLas emociones positivas, como la satisfacción por la simplificación de procesos, influyen en nuestras decisiones, fortaleciendo el compromiso con la estrategia actual.
  //     \t\tSombrero Negro (Pensamiento Crítico):
  //     \t\t\t\tIdentificamos posibles obstáculos, como la resistencia al cambio entre algunos miembros del equipo, que podrían afectar la implementación del asistente virtual.
  //     \t\t\t\tReconocemos los posibles problemas futuros, como desafíos de integración con otras plataformas, y estamos preparados para abordarlos proactivamente.
  //     \t\t\t\t Al evaluar nuestra estrategia, tenemos en cuenta aspectos negativos como posibles brechas de seguridad, asegurando una implementación sólida y confiable.
  //     \t\tSombrero Amarillo (Pensamiento Positivo):
  //     \t\t\t\tLas oportunidades de continuar con nuestra estrategia actual incluyen la posibilidad de mejorar aún más la productividad y la calidad del trabajo, consolidando nuestra posición en el mercado.
  //     \t\t\t\tAspectos positivos derivados de Lean Startup son la optimización de recursos y la capacidad de adaptación rápida a cambios en el entorno empresarial.
  //     \t\t\t\tNuestras ventajas sobre otras alternativas incluyen la personalización del asistente virtual para cumplir con los requisitos específicos de la gestión de proyectos.
  //     \t\tSombrero Verde (Creatividad e Ideas):
  //     \t\t\t\tGeneramos ideas innovadoras, como la incorporación de funciones de aprendizaje automático para anticipar las necesidades del equipo y ofrecer sugerencias proactivas.
  //     \t\t\t\tAbordamos desafíos actuales de manera diferente explorando la integración de interfaces de voz para una interacción más intuitiva con el asistente virtual.
  //     \t\t\t\tSoluciones creativas incluyen el desarrollo de una interfaz de usuario altamente intuitiva y la exploración de integraciones con herramientas de gestión de proyectos de última generación.
  //     \t\tSombrero Azul (Gestión del Proceso):
  //     \t\t\t\tOrganizamos la discusión de manera efectiva, estableciendo reuniones periódicas de revisión de avances y retroalimentación para garantizar la alineación del equipo.
  //     \t\t\t\tEl plan de acción incluye la implementación gradual de nuevas funcionalidades del asistente virtual, con evaluaciones regulares para ajustar la estrategia según sea necesario.
  //     \t\t\t\tGarantizamos la alineación del equipo mediante la comunicación abierta y la formación continua para aprovechar al máximo las capacidades del asistente virtual.

  //     Solo una raíz, deja el titulo como encabezado y respeta la jerarquia de los sobreros Y responde cada pregunta plateada, No es necesario utilizar "mermaid". No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
  // );
  

  // gpt-3.5-turbo
  async function callOpenAi() {
    setResult("");

    console.log(temperature);
   
    const url = "https://api.openai.com/v1/chat/completions";
    const data = {
      model: model,
      messages: [
        // {
        //   role: "system",
        //   content: promptTemplate
        // },
        {
          role: "user",
          content: prompt  
        },
        {
          role: "assistant",
          content: "Realiza la tecnica de los 6 sombreros para pensar teniendo como enfoque dar una solución al tema:" + prompt + "Teniendo en cuenta la siguiente estructura: Sombrero Blanco en donde se abarca datos objetivos que respaldan nuestra estrategia, Metricas del negocio o tema y evidencia concreta para concretar la hipotesis. Sombrero Rojo: abarca qué emociones podrían influir en el desarrollo del tema. Sombrero Negro: abarca cuáles son los posibles obstáculos o riesgos asociados con nuestro enfoque del tema y evaluar posibles problemas o desafios en el proyecto. Sombrero Amarillo: abarca Cuáles son las oportunidades y beneficios, aspectos positivos y ventajas que se puedan tener en base a otros proyectos. Sombrero Verde: abarca ideas innovadoras podemos generar para mejorar el proyecto, como podriamos afrontar desafios y crear soluciones creativas. Sombrero Azul: abarca Cómo podemos organizar y estructurar nuestra discusión y toma de decisiones, Cuál es el plan de acción para implementar los cambios o decisiones resultantes del desarrollo del proyecto. Finalmente establece una estructura por cada partado y centrate en fundamentar cada sombrero segun el tema"
        }
      ],
      stream: true,
      max_tokens: maxTokens,
      temperature: Number(temperature)
    };
    console.log(data)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error("Error:", response.statusText);
      return;
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let text = "";

    let resultString = ""; // Defina resultString aquí para recopilar todos los resultados

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      text += decoder.decode(value, { stream: true });
      const lines = text.split("\n");
      text = lines.pop();

      for (const line of lines) {
        const message = line.replace(/^data: /, "").trim();

        if (message === "") {
          continue;
        }

        if (message === "[DONE]") {
          /*setResult((prev) => {
            let result = processString(prev);
            console.log(result);
            return result;
          });*/
          return;
        }

        try {
          const parsed = JSON.parse(message);
          let result = parsed.choices[0].delta.content || "";

          <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(result)
            .pauseFor(2500)
            .start();
          }
        }

        />

          // Agregue cada línea a la cadena de resultados
          if (
            result !== "```" &&
            result !== "```mermaid" &&
            !result.includes("mermaid")
          ) {
            resultString += result;
          }

          //Si el resultado contiene una nueva línea, actualice el estado del resultado.
          if (
            result.includes("\n") &&
            result !== "```" &&
            result !== "```mermaid" &&
            !result.includes("mermaid")
          ) {
            setResult(resultString);
          }
        } catch (error) {
          console.error("No se pudo analizar JSON el mensaje de flujo", {
            message,
            error
          });
        }
      }
    }

    console.log("before processString");
    //Establezca el estado final después de que finalice el ciclo si aún no se ha configurado
    if (
      !resultString.includes("\n") &&
      result !== "```" &&
      result !== "```mermaid" &&
      !result.includes("mermaid")
    ) {
      setResult(resultString);
    }
    
  }

  return (
    <div className="App">
      <div className="tab-buttons">
      <button className="tab-button btn btn-primary" onClick={() => setModalConfig(false)}>
      <i className="fa fa-cog" aria-hidden="true"></i>
        </button>
        <button className="tab-button btn btn-success" onClick={() => guardarMapa()}>Guardar Mapa</button>
        <button
          className="d-none tab-button btn btn-primary"
          onClick={() => setActiveTab("Mindmapping")}
        >
          Artefacto
        </button>
      </div>
      {activeTab === "Mindmapping" ? (
        <MindmappingTab
          prompt={prompt}
          setPrompt={setPrompt}
          result={result}
          setResult={setResult}
          callOpenAi={callOpenAi}
          model={model}
          // promptTemplate={promptTemplate}
        />
      ) : (
        <SettingsTab
          token={token}
          setToken={setToken}
          model={model}
          setModel={setModel}
          // promptTemplate={promptTemplate}
          // setPromptTemplate={setPromptTemplate}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          temperature={temperature}
          setTemperature={setTemperature}
        />
      )}
      <div className="modalConfig" hidden={modalConfig}>
        <section className="modal-contenedor-config container">
          <SettingsTab
            token={token}
            setToken={setToken}
            model={model}
            setModel={setModel}
            // promptTemplate={promptTemplate}
            // setPromptTemplate={setPromptTemplate}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            temperature={temperature}
            setTemperature={setTemperature}
          />
          <button className="tab-button mt-4 mb-4 form-control btn btn-success" onClick={() => setModalConfig(true) }>Guardar Configuracion</button>
        </section>
      </div>
    </div>
  );
}
