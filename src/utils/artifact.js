import axios from 'axios'
import { URL_link } from '../config/config'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const registerArtifact = async (data) => {
    try {
      const response = await axios.post(`${URL_link}/addArtifact`, {
        id : data.id,
        nombre: data.nombre,
        prompt: data.prompt,
        respuesta: data.respuesta,
      })
      return response
    } catch (error) {
      return error.response
    }
  }
  export const listadoArtefactos = async (data) => {
    try {
      console.log('--------- data.id .....')
      console.log(data.id)
    const response = await axios.get(`${URL_link}/verArtefactos/${data.id}`)
    console.log('respuesta')
    console.log(response)
    return response
    } catch (error) {
      return error.response
    }
  }

  export const UpDateArtifact = async (data) => {
    console.log('---------------------------')
    console.log(data)
    try {
      const response = await axios.patch(`${URL_link}/EditarArtefacto`, {
        id : data.idArtefacto,
        respuesta: data.respuesta
      })
      return response
    } catch (error) {
      return error.response
    }
  }
  export const listadoProject = async (data) => {
    try {
    const response = await axios.get(`${URL_link}/verTema/${data.idProject}`)      
    console.log('data .. ' + data.idProject)
    console.log('------------------************')
    console.log(response)
    return response
    } catch (error) {
      return error.response
    }
  }