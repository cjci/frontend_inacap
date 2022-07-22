import { Group, Button, Text, Box, Center } from '@mantine/core';
import { useEffect } from 'react';

import usePacientes from '../hooks/usePacientes';

const Colaborador = ({ colaborador }) => {

    const { manejarModalEliminarColaborador } = usePacientes();
    const { nombre, email } = colaborador;

    return (
        <div>


            <Group>
                <Box>
                    <Center>

                        <Text weight={700}>
                            {nombre}
                        </Text>

                    </Center>

                    <Center>
                        <Text weight={700}>
                            {email}
                        </Text>
                    </Center>

                </Box>

                <Group position="right" style={{ marginTop: 10 }}>
                    <Button color="red" onClick={() => manejarModalEliminarColaborador(colaborador)}>
                        Eliminar
                    </Button>
                </Group>
            </Group>




        </div>
    )
}

export default Colaborador