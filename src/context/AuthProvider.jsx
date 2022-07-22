//creacion del context api´s

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();//aquí se crea 1

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});//como viene de un objeto se devuelve como objeto
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();
   
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return
            }            

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`   
                }
            }
            
            try {
                const {data} = await clienteAxios('/usuarios/perfil/', config)
                
                
                setAuth(data);
                navigate('/pacientes')/* 431 */
            } catch (error) {
                setAuth({});
            }
            setCargando(false);
        } 
        
        return () => { autenticarUsuario();};

    }, [])// se ejecuta una sola vez para comprar si hay un token en el localhost para tratar de autenticar al usuario

    const cerrarSesionAuth = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext; 