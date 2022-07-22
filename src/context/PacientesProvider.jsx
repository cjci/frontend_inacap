import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom';



const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [paciente, setPaciente] = useState({});
    const [cargando, setCargando] = useState(false);
    const [ficha, setFicha] = useState({});
    const [opened, setOpened] = useState(false);
    const [colaborador, setColaborador] = useState({});
    const [modalEliminarFicha, setModalEliminarFicha] = useState(false);
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes/', config)
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);

    };

    const submitPaciente = async paciente => {
        if (paciente.id) {
            await editarPaciente(paciente);
        } else {
            await nuevoPaciente(paciente);
        }
    }

    const editarPaciente = async paciente => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
            console.log(data);

            //sincroniza el state
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id
                === data._id ? data : pacienteState)
            setPacientes(pacientesActualizados);

            setAlerta({
                msg: 'Estudiante actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/pacientes')
            }, 5000)

        } catch (error) {
            console.log(error)
        }
    }

    const nuevoPaciente = async paciente => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes/', paciente, config)

            setPacientes([...pacientes, data])//actualiza la lista de pacientes sin actualizar pág

            setAlerta({
                msg: 'Estudiante creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/pacientes')
            }, 5000)

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerPaciente = async id => {
        setCargando(true);
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/pacientes/${id}`, config);
            setPaciente(data);
            setAlerta({});

        } catch (error) {
            navigate('/pacientes')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(()=> {
                setAlerta({});
            }, 3000);
            
        } finally {
            setCargando(false);
        }
    }

    const eliminarPaciente = async id => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id);
            setPacientes(pacientesActualizados);

            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/pacientes')
            }, 5000);

        } catch (error) {
            console.log(error);
        }
    }

    const submitFicha = async ficha => {

        if (ficha?.id) {
            await editarFicha(ficha)
        } else {
            await crearFicha(ficha)
        };        

    }

    const editarFicha = async ficha => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/fichas/${ficha.id}`, ficha, config)

            const pacienteActualizado = { ...paciente }
            pacienteActualizado.fichas = pacienteActualizado.fichas.map(fichaState => fichaState._id === data._id ? data : fichaState);
            setPaciente(pacienteActualizado);

            setAlerta({})
            setOpened(false)

        } catch (error) {
            console.log(error)
        }
    }

    const crearFicha = async ficha => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/fichas/', ficha, config);

            //agregar la ficha al state
            const pacienteActualizado = { ...paciente };
            pacienteActualizado.fichas = [...paciente.fichas, data];
            setPaciente(pacienteActualizado);
            setAlerta({});

        } catch (error) {
            console.log(error);
        }
    }

    const manejarModal = () => {
        setOpened(!opened);
        setFicha({});
    }

    const ModalEditarFicha = ficha => {
        setFicha(ficha)
        setOpened(true)
    }

    const ManejoModalEliminar = ficha => {
        setFicha(ficha);
        setModalEliminarFicha(!modalEliminarFicha);
    }

    const eliminarFicha = async () => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/fichas/${ficha._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            const pacienteActualizado = { ...paciente }
            pacienteActualizado.fichas = pacienteActualizado.fichas.filter(fichaState => fichaState._id !== ficha._id)

            setPaciente(pacienteActualizado);
            setOpened(false)
            setModalEliminarFicha(false)
            setFicha({})

            setTimeout(() => {
                setAlerta({})
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes/colaboradores/', { email }, config);
            setColaborador(data);
            setAlerta({});

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/pacientes/colaboradores/${paciente._id}`, email, config);
            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({});

            setTimeout(() => {
                setAlerta({})
            }, 3000)

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const manejarModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador);
        setColaborador(colaborador);
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/pacientes/eliminar-colaborador/${paciente._id}`, {id: colaborador._id}, config);

            const pacienteActualizado = {...paciente}

            pacienteActualizado.colaboradores = pacienteActualizado.colaboradores.filter
            (colaboradorState => colaboradorState._id !== colaborador._id)

            setPaciente(pacienteActualizado)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesionPacientes= () => {
        setPacientes({});
        setPaciente([]);
        setAlerta({});
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente,
                obtenerPaciente,
                paciente,
                cargando,
                eliminarPaciente,
                submitFicha,
                manejarModal,
                opened,
                ModalEditarFicha,
                submitColaborador,
                ficha,
                colaborador,
                agregarColaborador,
                ManejoModalEliminar,
                modalEliminarFicha,
                eliminarFicha,
                manejarModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                cerrarSesionPacientes

            }}
        >
            {children}

        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
};

export default PacientesContext;