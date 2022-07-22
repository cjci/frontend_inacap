import { TextInput, Checkbox, Button, Group, Box, Textarea } from '@mantine/core';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import usePacientes from '../hooks/usePacientes';
import Alerta from './Alerta';

/* 444 fechas */

const FormularioPaciente = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [rut, setRut] = useState('');
    const [carrera, setCarrera] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const params = useParams();
    const { mostrarAlerta, alerta, submitPaciente, paciente } = usePacientes();

    useEffect(() => {
        if (params.id && paciente.nombre) {
            setId(paciente._id);
            setNombre(paciente.nombre);
            setApellidos(paciente.apellidos);
            setRut(paciente.rut);
            setCarrera(paciente.carrera);
            setEmail(paciente.email);
            setCelular(paciente.celular);
            setDescripcion(paciente.descripcion);
        }
    }, [params])



    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, apellidos, rut, carrera, email, celular, descripcion].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        };

        //pasar datos hacia el provider
        await submitPaciente({ id, nombre, apellidos, rut, carrera, email, celular, descripcion });

        setId(null)
        setNombre('')
        setApellidos('')
        setRut('')
        setCarrera('')
        setEmail('')
        setCelular('')
        setDescripcion('')
    }

    const { msg } = alerta;

    return (
        <div>
            <Box sx={{ maxWidth: 400 }} mx="auto">

                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <TextInput

                        label="Nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                    <TextInput

                        label="Apellidos"
                        placeholder="apellidos"
                        value={apellidos}
                        onChange={e => setApellidos(e.target.value)}
                    />

                    <TextInput

                        label="Rut"
                        placeholder="Rut"
                        value={rut}
                        onChange={e => setRut(e.target.value)}
                    />

                    <TextInput

                        label="Carrera"
                        placeholder="Carrera"
                        value={carrera}
                        onChange={e => setCarrera(e.target.value)}
                    />

                    <TextInput

                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextInput

                        label="Celular"
                        placeholder="Celular"
                        value={celular}
                        onChange={e => setCelular(e.target.value)}
                    />

                    {/* <TextInput
                        required
                        label="Descripcion"
                        placeholder="Descripcion"
                        
                    /> */}

                    <Textarea
                        placeholder="Descripcion"
                        label="Descripcion"

                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />



                    <Group position="right" mt="md">
                        <Button type="submit" value="Crear Paciente">Guardar</Button>
                    </Group>
                </form>

            </Box>
        </div>
    )
}

export default FormularioPaciente