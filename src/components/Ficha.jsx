import { Text, Box, Button, Group, Paper, Center } from '@mantine/core';
import usePacientes from '../hooks/usePacientes';

import useAdmin from '../hooks/useAdmin';

import { useState, useEffect } from 'react';


const Ficha = ({ ficha }) => {

    const { ModalEditarFicha, ManejoModalEliminar } = usePacientes();
    const { observaciones, _id } = ficha;

    const admin = useAdmin();

    return (
        <div>
            <Box style={{ marginBottom: 20 }}>

                <Center>
                    <Group>
                        <Paper shadow="xs" p="md" style={{ marginBottom: 20, width: 900 }}>
                            <Text>{observaciones}</Text>
                        </Paper>
                    </Group>

                    {admin && (
                        <Group position="right" style={{ paddingLeft: 20 }}>

                            <Button onClick={() => ModalEditarFicha(ficha)}>
                                editar
                            </Button>

                            {/* <Button color="red" onClick={() => ManejoModalEliminar(ficha)}>eliminar</Button> */}

                        </Group>
                    )}

                    {admin && (
                        <Group position="right" style={{ paddingLeft: 20 }}>

                           {/*  <Button onClick={() => ModalEditarFicha(ficha)}>
                                editar
                            </Button> */}

                            <Button color="red" onClick={() => ManejoModalEliminar(ficha)}>eliminar</Button>

                        </Group>
                    )}


                </Center>

            </Box>

        </div>
    )
}

export default Ficha