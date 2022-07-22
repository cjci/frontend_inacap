import usePacientes from "../hooks/usePacientes"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import FormularioPaciente from "../components/FormularioPaciente";

import { Text, Box, Button, Group } from '@mantine/core';

const EditarPaciente = () => {
    const params = useParams();
    const { obtenerPaciente, paciente, cargando, /* eliminarPaciente */ } = usePacientes();

    useEffect(() => {
        obtenerPaciente(params.id)
    }, []);

    /* const handleClick = () => {
        if (confirm('¿Deseas eliminar este Estudiante?')) {
            eliminarPaciente(params.id);
        }
    } */

    const { nombre } = paciente;

    if (cargando) return 'Cargando...'
    return (

        <div>

            <div>
                <Box sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                })}>
                    <div>Editar Estudiante: {nombre}</div>

                    <Box>
                        <FormularioPaciente />
                    </Box>

                    {/* <Group position="right">

                        <Box>
                            <Button onClick={handleClick}
                            >eliminar</Button>
                        </Box>

                    </Group> */}


                </Box>

            </div>

        </div>

    )
}

export default EditarPaciente