import FormularioPaciente from '../components/FormularioPaciente';

import {  Text, Box, Card } from '@mantine/core';

const NuevoPaciente = () => {
  return (


    <Card shadow="sm" p="lg" sx={(theme) => ({
      backgroundColor: theme.colors.gray[0]
    })}>
      
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size="xl"
        weight={900}
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
      >
        Crear Estudiante
      </Text>

      <Box>
        <FormularioPaciente />
      </Box>
    </Card>

  )
}

export default NuevoPaciente;