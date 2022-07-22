import { Box, Text } from '@mantine/core';

import usePacientes from '../hooks/usePacientes';
import PreviewPaciente from '../components/PreviewPaciente';

import Alerta from '../components/Alerta';

const Pacientes = () => {
  const { pacientes, alerta } = usePacientes();
  
  const {msg} = alerta;

  return (

    <div>

      <Box style={{marginBottom: 20}}>
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="xl"
          weight={900}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Estudiante
        </Text>

      </Box>

      {msg && <Alerta alerta={alerta} /> }

      <Box>
        {pacientes.length ?
          pacientes.map(paciente => (
            <PreviewPaciente
              key={paciente._id}
              paciente={paciente}
            />
          ))
          : <p>No hay Estudiantes aún</p>}
      </Box>
    </div>
  )
}

export default Pacientes