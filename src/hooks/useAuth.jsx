import { useContext } from "react";
import AuthContext from '../context/AuthProvider';///aquí se usa 2

const useAuth = () => {
    return useContext(AuthContext);//le permise ingresar a los datos del AuthContext
}

export default useAuth;

