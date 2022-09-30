
import { useForm } from 'react-hook-form';
import "../styles/Login.css"
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const axios = require('axios').default;

export default function Login() {
    const [ token, setToken ] = useState("");
    const [refreshToken, setRefreshToken] = useState("")
    
    const navigator = useNavigate()
    const loginModel = {
        Username:"",
        Password:""
    }
    const [login, setLogin] = useState(loginModel)
    function handleChange(evt) {
       
        const { name, value } = evt.target;
      
        const newValues = {
            ...login,
            [name]: value,
        };
        setLogin(newValues);
    }
    const saveToken = () => {
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("RefreshToken", refreshToken);
            localStorage.setItem("UserName", login.Username);
            navigator("/avisoDeCarga/" + token)
            console.log("entre 2");
            refrescar()
        } else {
            navigator("/")
        }
        console.log(token);
    }
    const refrescar = () => {
        console.log("entre");
        window.location.reload()
    }

    const handleSubmit = function (evt) {
        evt.preventDefault();
        axios.post("https://apiadv.sintia.com.ar/Account/ValidLogin", login)
            .then(response => {
                setToken(response.data.AccessToken + ":" + login.UserName)
                setRefreshToken(response.data.RefreshToken);
            }
            )

    };





    useEffect(() => {
        if (token) {
            <Navigate to={"/avisoDeCarga/" + token} />
        } else {
            <Navigate to={"/"} />
        }
    }, [token])



    return (
        
        <>
        {token ? (
            <>
            {saveToken()}
            </>
        ):(
<div className='containerLogin'>
                <div className='subContainerLogin'>
                    <div className='titleLogin'>
                        <h1 >Ingreso</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="formLogin">


                    <div className="continput">
                        <b>Usuario</b>
                            <input onChange={handleChange} placeholder="Usuario"  id="userName" name="Username" className="inputLogin" value={login.Username}  />
                        </div>
                        <div className="continput">
                        <b>Password</b>
                            <input onChange={handleChange} placeholder="Contraseña"  id="Password" name="Password" className="inputLogin" value={login.Password}  />
                        </div>
                        <input type="submit" className='buttonLogin' />
                    </form>

                </div>
            </div>
        )}

            

        </>
    );
}






