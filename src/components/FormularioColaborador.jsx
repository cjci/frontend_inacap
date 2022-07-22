import { TextInput, Checkbox, Button, Group, Text, Box, Container } from "@mantine/core"
import usePacientes from "../hooks/usePacientes";
import Alerta from './Alerta'
import { useState } from "react"


const FormularioColaborador = () => {

    const [email, setEmail] = useState('');

    const { mostrarAlerta, alerta, submitColaborador } = usePacientes();

    const handleSubmit = e => {
        e.preventDefault();
        if (email === '') {
            mostrarAlerta({
                msg: 'El mail es obligatorio',
                error: true
            })
            return;
        }

        submitColaborador(email);
    }

    const { msg } = alerta;

    return (
        <div>

            <Text weight={500} size="md">Agregue colaborador mediante correo electrónico</Text>

            <Container>

                <Box>
                    <form onSubmit={handleSubmit}>

                        {msg && <Alerta alerta={alerta} />}

                        <TextInput

                            label="Email"
                            placeholder="email colaborador"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />

                        <Group position="right" mt="md">
                            <Button type="submit">Buscar</Button>
                        </Group>

                    </form>
                </Box>
            </Container>


        </div>
    )
}

export default FormularioColaborador