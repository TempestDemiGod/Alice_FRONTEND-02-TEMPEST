import React, { useState, useEffect } from "react";
import Mermaid from "../../../utils/Mermaid";
import { UpDateArtifact, listadoProject, registerArtifact } from '../../../utils/artifact';
import "../../mapasEquilibrados/brainstorming.css";

let idProject
let apikey
let temaproyecto
let respuestaObtenida
let respuestaArtefactoID
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
          className="form-control bg-dark text-white mb-3"
          type="password"
          id="token"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="model">Motor GPT:</label>
        <select
          className="form-control bg-dark text-white mb-3"
          name="model"
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

      <div>
        <label htmlFor="promptTemplate">Prompt Template:</label>
        <textarea
          type="text"
          className="form-control bg-dark text-white mb-3"
          id="promptTemplate"
          name="promptTemplate"
          value={promptTemplate}
          onChange={handlePromptTemplateChange}
        />
      </div>
    </div>
  );
}

export default function MapaCustomer({id,tema,api,respuestaDB,ArtecatoDB}) {
  
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
    let nombre = 'Customer Journey Map'
    let idArtefacto = respuestaArtefactoID 
    console.log('idArtefacto')
    console.log(idArtefacto)
    const data = {
      idArtefacto,
      respuesta
  }
  console.log(data)
  const result = await UpDateArtifact(data)
    console.log(result)
  }
  const [temperature, setTemperature] = useState(
    localStorage.getItem("temperature") || 0.7
  );

  const [promptTemplate, setPromptTemplate] = useState(
    localStorage.getItem("promptTemplate") ||
      `Cree un mapa mental de mermaid basado en las aportaciones del usuario como estos ejemplos:
journey map
journey
\t\t\t\t\ttitle Asista a una conferencia tecnológica
\t\t\t\t\tsection Pre-Conferencia
\t\t\t\t\t\t\tCompra una Entrada: 4: Asistentes, Punto de Venta
\t\t\t\t\t\t\Consultar Horario antes de la Conferencia: 6: Asistentes, Sitio
\t\t\t\t\t\t\tDesarrollo de prototipos: 4: Me, Cat
\t\t\t\t\tsection Mañana
\t\t\t\t\t\t\tRegistro en la Conferencia: 5: Asistentes, Voluntarios
\t\t\t\t\t\t\tConsultar horario en la conferencia: 4: asistentes, aplicación móvil
\t\t\t\t\t\t\tAsistir a la Charla: 5: Asistentes, Oradores, Voluntarios
\t\t\t\t\tsection tarde 
\t\t\t\t\t\t\t Almuerzo: 3: Asistentes, Voluntarios
\t\t\t\t\t\t\t"Pasillo de pasillo": 5: Asistentes, Voluntarios
\t\t\t\t\t\t\tPelícula posterior a la conferencia: 12: asistentes, voluntarios, orador
text summary journey:
journey
\t\t\t\t\ttitle Realización de un proyecto binefico
\t\t\t\t\tsection Intercambio de Bienes: 
\t\t\t\t\t\t\tPrepara y ofrecer un bien: 2: dias
\t\t\t\t\t\t\tIndicar especffcacnnes del blen: 4: dias
\t\t\t\t\t\t\tBuscar bien de Interes: 5 : dias
\t\t\t\t\t\t\tLeer y observar detalles del ben: 3: dias
\t\t\t\t\t\t\tProponer oferta de Intercambio: 2: dias
\t\t\t\t\t\t\tConfirmar Intercambio: 1: dias
\t\t\t\t\t\t\tCoordinar entrega de bien: 2: dias
\t\t\t\t\t\t\tElegir método de pago: 4: dias
\t\t\t\t\t\t\tHacer Intercambio de bienes: 2: dias
\t\t\t\t\tsection Envio de paquetes
\t\t\t\t\t\t\tPreparar el paquete: 2: dias
\t\t\t\t\t\t\tHacer cola para envio: 6: dias
\t\t\t\t\t\t\tEspecificar datos del remitente: 2: dias
\t\t\t\t\t\t\tEspecificar datos de envto: 1: dias
\t\t\t\t\t\t\tElegir método de pago: 2: dias
\t\t\t\t\t\t\tRealizar pago: 1: dias
\t\t\t\t\t\t\tEntregar paquete: 5: dias
\t\t\t\t\t\t\tRecibir comprobante: 2: dias
\t\t\t\t\t\t\tRecibir fecha de entrega: 3: dias
\t\t\t\t\tsection Recepcion de paquetes
\t\t\t\t\t\t\tEntrar a la plataforma de envio: 2: dias
\t\t\t\t\t\t\tHacer seguimiento del paquete: 2: dias
\t\t\t\t\t\t\tEsperar llegada del paquete: 1: dias
\t\t\t\t\t\t\tRecibil el paquete: 2: dias
\t\t\t\t\t\t\tComprobar estado del bien: 1: dias
\t\t\t\t\t\t\tConfirmar la entrega del paquete: 2: dias


Solo una raíz, deja la palabra journey como encabezado y respeta la jerarquia title y section, ademas despues de cada numero genera ":" , No es necesario utilizar "mermaid". No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
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
          content: "Genera una lista de actividades que den solucion al problema con las estimaciones no mayor de 7 dias del tema:" + prompt
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
