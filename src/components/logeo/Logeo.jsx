import './Logeo.css'

import { login } from '../../utils/auth';
import { useState } from 'react';
import image from "../../assets/imgMain.png";
import imgAlice from "../../assets/Alice.png";
import { LoginMain } from './LogIn/logIn';
import { RegistroMain } from './signUp/signUp';

export const Logeo = ()=>{
    const [mostrarMenu, setMostrarMenu] = useState(true)
  const logeo = () => {
    setMostrarMenu(!mostrarMenu)
  }  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(email);
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
        console.log(email);("Settings")
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        } 
      };
    
    return(
    <div className='contenedor'>
        <div className="imagen">
            <div className="luz">
                <div className="punto"></div>
            </div>
        <img src={image}/>
        </div>
        <div className="form-container">
            <div className="logo-login">
                <img src={imgAlice}/>
            </div>
            {mostrarMenu ? <LoginMain /> : <RegistroMain/> }
            <br/>
            {mostrarMenu ? <span className='text-cambio'>Si no tienes tienes una cuenta       <a className='punto-cambio' onClick={logeo}>Registrate</a></span>: <span className='text-cambio'>Si tienes tienes una cuenta       <a className='punto-cambio' onClick={logeo}>Iniciar Sesion</a></span>}
        </div>
    </div>

     )
} 