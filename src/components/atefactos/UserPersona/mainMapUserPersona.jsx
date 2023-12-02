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


  return (
    <div className="App">
      <div className="outer parametros-textos">
        <div className="text-extendido-textos">
          <div>Prompt de entrada</div>
          <div className="textarea text-extendido salida-extendido-textos">
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="text-extendido-textos">
          <div >Salida</div>
          <div className="textarea text-extendido">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <button className="btn form-control btn btn-outline-dark mb-4" onClick={() => callOpenAi()}>Generar Artefacto</button>
    </div>
  );
}

function SettingsTab({
  token,
  setToken,
  model,
  setModel,
  promptTemplate,
  setPromptTemplate,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature
}) {
  const handlePromptTemplateChange = (e) => {
    setPromptTemplate(e.target.value);
    localStorage.setItem("promptTemplate", e.target.value);
  };

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
    <div>
      <h1 className="mt-4 mb-3"><i className="fa fa-cog" aria-hidden="true"></i> Configuraciones</h1>
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
          id="model"
          className="form-control bg-dark text-white mb-3"
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

      <div>
        <label htmlFor="promptTemplate">Prompt Template:</label>
        <textarea
          type="text"
          id="promptTemplate"
          className="form-control bg-dark text-white mb-3"
          name="promptTemplate"
          value={promptTemplate}
          onChange={handlePromptTemplateChange}
        />
      </div>
    </div>
  );
}

export default function MapUserPersona({id,tema,api,respuestaDB,ArtecatoDB}) {
  
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
    let nombre = 'User Persona'
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

  const [promptTemplate, setPromptTemplate] = useState(
    localStorage.getItem("promptTemplate") ||
      `Cree un User Persona basado en las aportaciones del usuario como estos ejemplos:
       User Persona:
       \t\tNombre: José García
       \t\t\t\tDemografía:
       \t\t\t\t\t\tEdad: 28 años
       \t\t\t\tGénero: Masculino
       \t\t\t\tUbicación: Trujillo, Perú
       \t\t\t\tNivel de Educación: Estudiante universitario a punto de graduarse
       \t\t\t\tDatos de trabajo:
       \t\t\t\t\t\tOcupación: Estudiante de Ingeniería de Sistemas
       \t\t\t\t\t\tEmpresa: Proyectos Innovadores SAC (pasante)
       \t\t\t\tDesafíos y necesidades:
       \t\t\t\t\t\tDesafío: Coordinar eficientemente tareas y plazos en proyectos complejos.
       \t\t\t\t\t\tNecesidad: Una herramienta que simplifique la gestión de proyectos y mejore la colaboración en equipos distribuidos.
       \t\t\t\tObjetivos y deseos:
       \t\t\t\t\t\tObjetivo Profesional: Destacar en su pasantía y obtener habilidades sólidas en la gestión de proyectos.
       \t\t\t\t\t\tDeseo Personal: Lograr un equilibrio entre el trabajo y los estudios sin comprometer la calidad de su desempeño.
       \t\t\t\tComportamiento de compra:
       \t\t\t\t\t\tPrefiere probar versiones gratuitas antes de comprometerse a comprar.
       \t\t\t\t\t\tValora la opinión de otros estudiantes y profesionales en su red.
       \t\t\t\tComportamiento en línea:
       \t\t\t\t\t\tParticipa en grupos de estudiantes de ingeniería en Facebook.
       \t\t\t\t\t\tLee blogs de tecnología y gestión de proyectos.
       \t\t\t\tFrustraciones actuales:
       \t\t\t\t\t\tDificultad para coordinar reuniones efectivas con compañeros de proyecto.
       \t\t\t\t\t\tPérdida de información importante debido a la falta de centralización en las herramientas utilizadas.
       \t\t\t\tExpectativas del producto:
       \t\t\t\t\t\tFunciones de colaboración en tiempo real.
       \t\t\t\t\t\tIntegración con otras herramientas comunes de productividad.
       \t\t\t\tCita ficticia:
       \t\t\t\t\t\t"Necesito una herramienta que no solo organice mis tareas, sino que también simplifique la comunicación y colaboración en equipo. Estoy ansioso por encontrar una solución que se adapte perfectamente a las demandas de mis proyectos y estudios."
       \t\t\t\tCanales de comunicación:
       \t\t\t\t\t\tGrupos de estudiantes en Facebook para discusiones informales.
       \t\t\t\t\t\tCorreo electrónico para comunicaciones más formales y oportunidades de aprendizaje.
       \t\t\t\tNotas adicionales:
       \t\t\t\t\t\tJosé es un usuario tecnológicamente competente y está dispuesto a adoptar nuevas soluciones que mejoren su eficiencia y desempeño en la gestión de proyectos.

      Solo una raíz,siempre deja como titulo el "User Persona", respeta las jerarquias: Demografía,Datos de trabajo,Desafíos y necesidades, Objetivos y deseos, Comportamiento de compra, Comportamiento en línea, Frustraciones actuales, Expectativas del producto, Cita ficticia, Canales de comunicación y Notas adicionales  , No es necesario utilizar "mermaid". No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
  );
  

  // gpt-3.5-turbo
  async function callOpenAi() {
    setResult("");

    console.log(temperature);
   
    const url = "https://api.openai.com/v1/chat/completions";
    const data = {
      model: model,
      messages: [
        {
          role: "system",
          content: promptTemplate
        },
        {
          role: "user",
          content: prompt  
        },
        {
          role: "assistant",
          content: "Genera un User persona teniendo en cuenta el framework Lean StartUp sobre el siguiente tema:" + prompt + "Aportando soluciones tecnologicas"
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
        <button className="tab-button btn btn-outline-primary" onClick={() => setModalConfig(false)}>
      <i className="fa fa-cog" aria-hidden="true"></i> Configuración
        </button>
        <button className="tab-button btn btn-outline-success" onClick={() => guardarMapa()}>Guardar Mapa</button>
        <button
          className="d-none tab-button btn btn-outline-primary"
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
          promptTemplate={promptTemplate}
        />
      ) : (
        <SettingsTab
          token={token}
          setToken={setToken}
          model={model}
          setModel={setModel}
          promptTemplate={promptTemplate}
          setPromptTemplate={setPromptTemplate}
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
            promptTemplate={promptTemplate}
            setPromptTemplate={setPromptTemplate}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            temperature={temperature}
            setTemperature={setTemperature}
          />
          <button className="tab-button mt-4 mb-4 form-control btn btn-outline-success" onClick={() => setModalConfig(true) }>Guardar configuracion</button>
        </section>
      </div>
    </div>
  );
}
