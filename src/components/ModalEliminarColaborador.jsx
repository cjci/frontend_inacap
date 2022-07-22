import { Modal, Text, Group, Button, Box } from '@mantine/core';

import usePacientes from '../hooks/usePacientes';

const ModalEliminarColaborador = () => {

    const { manejarModalEliminarColaborador, modalEliminarColaborador, eliminarColaborador } = usePacientes();

    return (
        <div>
            <Modal
                opened={modalEliminarColaborador}
                onClose={manejarModalEliminarColaborador}
                title="Eliminar Colaborador"
            >
                <Box>
                    <Text>
                        Una vez eliminado, esta persona no podrá acceder al Estudiante.
                    </Text>

                    <Group position="right">
                        <Button onClick={manejarModalEliminarColaborador}>Cancelar</Button>
                        
                        <Button color="red" onClick={eliminarColaborador}>Eliminar Colaborador</Button>
                        
                    </Group>


                </Box>


            </Modal>

        </div >
    )
}

export default ModalEliminarColaborador