import React, { useState, useEffect } from "react";
import Mermaid from "../../../utils/Mermaid";
import { UpDateArtifact, listadoProject, registerArtifact } from '../../../utils/artifact';
// import { listado } from "../../utils/proyects";

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
      <div className="outer">
        <div>
          <div className="title-map-box">Prompt de entrada</div>
          <div className="textarea">
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <div className="title-map-box">Salida</div>
          <div className="textarea">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <button className="btn form-control btn btn-outline-dark" onClick={() => callOpenAi()}>Generar Artefacto</button>
      <Mermaid key={result ? result.length : 0} chart={result} />
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
          id="maxTokens"
          className="form-control bg-dark text-white mb-3"
          name="maxTokens"
          value={maxTokens}
          onChange={handleMaxTokensChange}
        />
      </div>

      <div>
        <label htmlFor="temperature">Temperatura:</label>
        <input
          type="text"
          id="temperature"
          name="temperature"
          className="form-control bg-dark text-white mb-3"
          value={temperature}
          onChange={handleTemperatureChange}
        />
      </div>

      <div>
        <label htmlFor="promptTemplate">Prompt Template:</label>
        <textarea
          type="text"
          id="promptTemplate"
          name="promptTemplate"
          className="form-control bg-dark text-white mb-3"
          value={promptTemplate}
          onChange={handlePromptTemplateChange}
        />
      </div>
    </div>
  );
}

export default function MapaAfinidad({id,tema,api,respuestaDB,ArtecatoDB}) {
  
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
  const [activeTab, setActiveTab] = useState("Mindmapping");
  const [token, setToken] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [maxTokens, setMaxTokens] = useState(
    localStorage.getItem("maxTokens") || 2000
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
    let nombre = 'Mapa de Afinidad'
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
      `Cree un mapa mental de mermaid basado en las aportaciones del usuario como estos ejemplos:
mindmap
\t\t\troot((Asistente virtual para la gestión de proyectos de innovación))
\t\t\t\tIdea de solución 1:Integración de Tecnologías Avanzadas
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tExplorar la incorporación de inteligencia artificial y aprendizaje automático.
\t\t\t\t\t\t\tInvestigar la viabilidad de la integración de reconocimiento de voz y procesamiento de lenguaje natural.
\t\t\t\tIdea de solución 2:Personalización y Adaptabilidad
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tDesarrollar funciones personalizables según las necesidades específicas del proyecto.
\t\t\t\t\t\t\tImplementar capacidades de adaptación a diferentes industrias y contextos.
\t\t\t\tIdea de solución 3: Colaboración y Comunicación Efectiva
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tDiseñar herramientas de colaboración integradas para equipos dispersos.
\t\t\t\t\t\t\tMejorar las funciones de comunicación, notificaciones y actualizaciones en tiempo real.
\t\t\t\tIdea de solución 4: Evaluación Continua y Retroalimentación del Usuario
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tEstablecer un sistema de retroalimentación en tiempo real para evaluar la eficacia del asistente.
\t\t\t\t\t\t\tImplementar encuestas periódicas y análisis de uso para recopilar comentarios de los usuarios.
\t\t\t\tIdea de solución 5: Integración con Otras Herramientas de Gestión
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tInvestigar y establecer integraciones con plataformas de gestión de proyectos existentes.
\t\t\t\t\t\t\tPermitir una transición fluida de datos entre el asistente y otras herramientas utilizadas por los usuarios.
\t\t\t\tIdea de solución 6: Capacitación Continua del Asistente
\t\t\t\t\tAcciones para solucionar el problema
\t\t\t\t\t\t\tImplementar un sistema de aprendizaje continuo para mejorar la capacidad predictiva.
\t\t\t\t\t\t\tDesarrollar algoritmos que se adapten y evolucionen con base en la experiencia y los cambios en el entorno del proyecto.

Solo una raíz, deja la palabra "mindmap" como encabezado seguido por root ,ademas sigue la estructura de idea de solucción y acciones para solucionanrlo, y seguir los tipos de nodos "[", "(". No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
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
          content: "Me gustaria que representes al menos 6 ideas desarrollar soluciones al problemas mencionado:" + prompt +"luego, generar una lista con las acciones que pueden llevar a solucionar el problema"
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
        <button className="tab-button btn btn-outline-success"  onClick={() => guardarMapa()}>guardar mapa</button>
        <button
          className="tab-button btn btn-outline-primary"
          onClick={() => setActiveTab("Mindmapping")}
        >
          Artefacto
        </button>
        <button className="tab-button btn btn-outline-primary" onClick={() => setActiveTab("Settings")}>
          Configuración
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
      
    </div>
  );
}
