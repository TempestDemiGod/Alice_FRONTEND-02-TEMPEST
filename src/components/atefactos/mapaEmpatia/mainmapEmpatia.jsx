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
        <div className=" container-left">
          <div >Prompt de entrada</div>
          <div className="textarea text-extendido salida-extendido-textos">
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="btn-aprobar mt-4 mb-4">
       <button className="  form-control btn btn-dark mx-auto medio-btn" onClick={() => callOpenAi()}>Generar Artefacto</button>
       </div>
       <div className="salida-contenedor-lol pb-4 d-none">
          <div >Salida</div>
          <div className="textarea text-extendido">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
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
console.log('funciono chamo .. ' + respuestaArtefactoID )

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
          className="form-control bg-dark text-white mb-3"
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

export default function MapaEmpatia({id,tema,api,respuestaDB,ArtecatoDB}) {
  
  useEffect(() => {
    idProject = id
    apikey= api
    temaproyecto = tema
    respuestaObtenida = respuestaDB
    respuestaArtefactoID  = ArtecatoDB
    // verProyecto()
    setToken(apikey)
    console.log('respuestaArtefactoID')
    console.log(respuestaArtefactoID)
  },[]);
  useEffect(() => {
    setPrompt(temaproyecto)
    setResult(respuestaObtenida)
  },[]);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("Mindmapping");
  const [modalConfig, setModalConfig] = useState(true);
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
    let nombre = 'Mapa de Empatia'
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
      `Cree un mapa mental  basado en las aportaciones del usuario como estos ejemplos:
mindmap
\t\t\troot((Asistente virtual para la gestión de proyectos de innovación))
\t\t\t::icon(fa fa-book)
\t\t\t\tPersona o segmento de usuario que interviene con el problema?
\t\t\t\t\tEmprendedores y equipos de proyectos innovadores.
\t\t\t\t\t\tStartups en fase inicial.
\t\t\t\t\t\tEquipos de innovación en empresas establecidas.
\t\t\t\tLo que ven?
\t\t\t\t\tInterfaz intuitiva y amigable.
\t\t\t\t\t\tVisualización clara del progreso del proyecto.
\t\t\t\t\t\tHerramientas de colaboración y comunicación integradas.
\t\t\t\tLo que escuchan o oyen?
\t\t\t\t\tNecesidad de funciones personalizables según el tipo de proyecto.
\t\t\t\t\t\tRetroalimentación sobre la eficacia de las sugerencias del asistente.
\t\t\t\t\t\tSolicitudes de integración con otras herramientas de gestión.
\t\t\t\tLo que sugieren los usuarios?
\t\t\t\t\tMayor capacidad predictiva del asistente.
\t\t\t\t\t\tMejoras en la adaptabilidad a diferentes industrias.
\t\t\t\t\t\tRetroalimentación en tiempo real sobre el rendimiento del equipo.
\t\t\t\tLos esfuerzos que se sugiere para afrontar el tema
\t\t\t\t\tInvestigación continua de tecnologías emergentes.
\t\t\t\t\t\tColaboración con expertos en gestión de proyectos.
\t\t\t\t\t\tImplementación de actualizaciones frecuentes basadas en retroalimentación.
\t\t\t\tLos resultados que deseamos obtener
\t\t\t\t\tAumento en la eficiencia y productividad de los proyectos.
\t\t\t\t\t\tReducción de errores y retrabajo.
\t\t\t\t\t\tMayor satisfacción y retención de usuarios.
Solo una raíz, deja a "mindmap" como encabezado, evita poner "mermaid" en la estructura y manten la estrutura: Persona o segmento de usuario que interviene con el problema?, Lo que ven?, Lo que escuchan o oyen?, Lo que sugieren los usuarios?, Los esfuerzos que se sugiere para afrontar el tema y Los resultados que deseamos obtener. Evitar los tipos de nodos "[", " "-" "mermaid"( "," "-" . No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
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
          content: "Realiza un mapa de empatia basandose en el uso de la tecnologia,siguiendo la  estrutura: Persona o segmento de usuario que interviene con el problema?, Lo que ven?, Lo que escuchan o oyen?, Lo que sugieren los usuarios?, Los esfuerzos que se sugiere para afrontar el tema y Los resultados que deseamos obtener, para indagar en el tema :" + prompt
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
      <button className="tab-button btn btn-primary" onClick={() => setModalConfig(false)}>
      <i className="fa fa-cog" aria-hidden="true"></i>
        </button>
        <button className="tab-button btn btn-success" onClick={() => guardarMapa()}>Guardar Mapa</button>
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
