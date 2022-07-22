import usePacientes from "./usePacientes";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {paciente} = usePacientes()
    const {auth} = useAuth()

    return paciente.creador === auth._id
}

export default useAdmin;