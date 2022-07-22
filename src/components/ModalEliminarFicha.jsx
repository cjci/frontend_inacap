import { useState } from 'react';
import { Modal, Text, Group, Button, Box } from '@mantine/core';

import usePacientes from '../hooks/usePacientes';

const ModalEliminarFicha = () => {

    const { modalEliminarFicha, ManejoModalEliminar, eliminarFicha } = usePacientes();

    return (
        <div>
            <Modal
                opened={modalEliminarFicha}
                onClose={ManejoModalEliminar}
                title="Eliminar Ficha"
            >
                <Box>
                    <Text>
                        Estas seguro que deseas eliminar este documento
                    </Text>

                    <Group position="right">
                        <Button onClick={ManejoModalEliminar}>Cancelar</Button>
                        
                        <Button color="red" onClick={eliminarFicha}>Eliminar Ficha</Button>
                        
                    </Group>


                </Box>


            </Modal>

        </div >
    )
}

export default ModalEliminarFicha