import axios from 'axios'
import { URL_link } from '../config/config'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const login = async (data) => {
  try {
    console.log(`${URL_link}/login`)
    const response = await axios.post(`${URL_link}/login`, {
      email: data.email,
      password: data.password
    })
    console.log(`${URL_link}/login`)
    return response
  } catch (error) {
    return error.response
  }
}


export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${URL_link}/register`, {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: data.password,
    })
    return response
  } catch (error) {
    return error.response
  }
}

export const logout = async() => {
  const response = await axios.get(`${URL_link}/adios`)
}