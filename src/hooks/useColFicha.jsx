import usePacientes from "./usePacientes";
import useAuth from "./useAuth";

const useColFicha = () => {
    const {paciente} = usePacientes()
    const {auth} = useAuth()

    return paciente.creador !== auth._id
}

export default useColFicha;