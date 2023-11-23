import axios from 'axios'
import { URL_link } from '../config/config'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const registerProject = async (data) => {
    try {
      const response = await axios.post(`${URL_link}/addproject`, {
        id : data.id,
        nombre: data.nombre,
        tema: data.tema,
        apiKey: data.apiKey,
        description: data.description        
      })
      return response
    } catch (error) {
      return error.response
    }
  }

  export const listado = async () => {
    try {
    const response = await axios.get(`${URL_link}/getProject`)
    console.log(response)
    return response
    } catch (error) {
      return error.response
    }
  }
  
  export const elimarProyecto = async (data) => {
    try {
      console.log('a eliminar x2 ...  '+ data.id )
      console.log(data )
      let id = data.id
    const response = await axios.delete(`${URL_link}/deleteProject`, {
      data : {
        id
      }
    })
    console.log(response)
    return response
    } catch (error) {
      return error.response
    }
  }
  
  