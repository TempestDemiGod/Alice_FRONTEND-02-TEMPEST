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
          <div>Salida</div>
          <div className="textarea text-extendido">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <button className="btn form-control btn btn-outline-dark mb-4" onClick={() => callOpenAi()}>Generar Artefacto</button>
      {/* <Mermaid key={result ? result.length : 0} chart={result} /> */}
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

export default function UserResearchMap({id,tema,api,respuestaDB,ArtecatoDB}) {
  
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
    let nombre = 'User Research'
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
  //     `Cree un user Research  basado en las aportaciones del usuario como estos ejemplos:
  //     \tTema: Asistente Virtual en la gestion de proyectos
  //     \t\t\tDefinición de Objetivos
  //     \t\t\t\tQueremos entender a fondo las necesidades y desafíos específicos que enfrentan los profesionales de la gestión de proyectos en su día a día. Además, buscamos validar la viabilidad y aceptación de un asistente virtual diseñado para mejorar la eficiencia y la efectividad en la gestión de proyectos.
  //     \t\t\tElección de Métodos
  //     \t\t\t\tOptaremos por una combinación de entrevistas y pruebas de usabilidad. Las entrevistas nos permitirán obtener percepciones cualitativas profundas sobre las experiencias, desafíos y expectativas de los usuarios. Las pruebas de usabilidad nos darán información práctica sobre la facilidad de uso y la eficacia del asistente virtual en situaciones simuladas.
  //     \t\t\tRecopilación de Datos
  //     \t\t\t\tRealizaremos entrevistas individuales con profesionales de la gestión de proyectos, abordando preguntas específicas sobre sus métodos actuales, desafíos comunes y posibles mejoras. También implementaremos pruebas de usabilidad, solicitando a los participantes que realicen tareas representativas utilizando el asistente virtual.
  //     \t\t\tAnálisis de Datos
  //     \t\t\t\tLos datos recopilados se analizarán para identificar patrones en las respuestas de los usuarios, destacando las áreas de mayor interés y las posibles mejoras necesarias en el diseño del asistente virtual. Buscaremos tendencias en términos de preferencias de funcionalidades y aspectos de usabilidad.
  //     \t\t\tPresentación de Resultados
  //     \t\t\t\tLos resultados se presentarán de manera clara y accesible a los equipos de desarrollo, marketing y ventas. Se proporcionarán recomendaciones basadas en los hallazgos, resaltando las oportunidades de mejora y destacando las características del asistente virtual que han recibido una respuesta positiva por parte de los usuarios.
      
  //     Solo una raíz de tema y pon el titulo User Research, respeta la jerarquia: Definición de Objetivos,Elección de Métodos,Recopilación de Datos,Análisis de Datos y Presentación de Resultados , ademas despues de cada numero genera ":" , No es necesario utilizar "mermaid". No es necesario utilizar "mermaid", "\`\`\`", or "graph TD". Responder sólo con código y sintaxis.`
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
          content: "Genera un User Research teniendo en cuenta el framework Lean StartUp sobre el siguiente tema:" + prompt + "Respondiendo las siguientes preguntas: 1. Definición de objetivos: El primer paso es definir los objetivos de la investigación. ¿Qué queremos aprender sobre los usuarios? ¿Qué queremos validar?, 2. Definición de la audiencia: ¿Quiénes son los usuarios que queremos investigar? ¿Cuáles son sus características demográficas, psicográficas y conductuales?, 3. Elección de métodos: Existen una variedad de métodos de investigación de usuarios, como entrevistas, encuestas, grupos de discusión, observación y pruebas de usabilidad. El método que se elija dependerá de los objetivos de la investigación y de la audiencia que se quiera estudiar. 4. Recopilación de datos: Una vez se ha definido el método, se procede a la recopilación de datos. Esto puede implicar realizar entrevistas, encuestas, grupos de discusión, observación o pruebas de usabilidad. 5. Análisis de datos: Los datos recopilados se analizan para identificar patrones y tendencias y 6. Presentación de resultados: Los resultados de la investigación se presentan a los interesados, como los equipos de desarrollo, marketing y ventas. Finalmente fundamenta cada respuesta y centrate en desarrollar el tema ."
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
          <button className="tab-button mt-4 mb-4 form-control btn btn-outline-success" onClick={() => setModalConfig(true) }>Guardar Configuracion</button>
        </section>
      </div>
    </div>
  );
}
