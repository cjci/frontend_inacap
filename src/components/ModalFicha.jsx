import { useState, useEffect } from 'react';
import { Modal, Button, Group, Textarea, Box } from '@mantine/core';
import usePacientes from '../hooks/usePacientes';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

import useColFicha from '../hooks/useColFicha';

const ModalFicha = () => {

    const [id, setId] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const params = useParams();

    const colfich = useColFicha()

    const { mostrarAlerta, alerta, submitFicha, opened, manejarModal, ficha } = usePacientes();

    useEffect(() => {
        if (ficha?._id) {
            setId(ficha._id)
            setObservaciones(ficha.observaciones)
            return;
        }
        setId('');
        setObservaciones('');

    }, [ficha]); /* en esta linea se hace re-render */

    const handleSubmit = async e => {
        e.preventDefault();

        if ([observaciones].includes('')) {
            mostrarAlerta({
                msg: 'todos los campos son obligatorios',
                error: true
            })
            return;
        }

        await submitFicha({ id, observaciones, paciente: params.id });
        setId('');
        setObservaciones('');
    }

    const { msg } = alerta;
    return (
        <div>
            <Modal
                opened={opened}
                onClose={manejarModal}
                title="Observaciones"
            >
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>

                    <Textarea
                        placeholder=""
                        value={observaciones}
                        onChange={e => setObservaciones(e.target.value)}
                    />



                    <Box style={{ marginTop: 10 }}>
                        <Button
                            type='submit'
                            value={id ? 'Guardar Cambios' : 'Crear Ficha'}
                        >
                            Guardar
                        </Button>
                    </Box>



                </form>

            </Modal>
        </div>
    )
}

export default ModalFicha
