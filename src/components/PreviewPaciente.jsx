import { Box, Text, Group } from '@mantine/core';

import { Link } from 'react-router-dom';

const PreviewPaciente = ({ paciente }) => {
  const { nombre, _id } = paciente;

  return (
    <div>
      <Box
        
        style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}>

        <Group pl={20}>

          <Text weight={500}>
            {nombre}
          </Text>

        </Group>

        <Group position="right">

          <Link

            style={{ textDecoration: 'none', color: "#1C7ED6", paddingRight: 20 }}
            to={`${_id}`}
          >
            Ver Estudiante

          </Link>

        </Group>

      </Box>

    </div>
  )
}

export default PreviewPaciente;