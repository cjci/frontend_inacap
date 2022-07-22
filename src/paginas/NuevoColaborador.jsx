import { Text, Box, Button, Center } from '@mantine/core';
import FormularioColaborador from '../components/FormularioColaborador';
import { useEffect } from 'react';
import usePacientes from '../hooks/usePacientes';
import { useParams } from 'react-router-dom';
import Alerta from '../components/Alerta';

const NuevoColaborador = () => {

  const { obtenerPaciente, paciente, colaborador, cargando, agregarColaborador, alerta } = usePacientes();
  const params = useParams();

  useEffect(() => {
    obtenerPaciente(params.id);
  }, []);

  if (!paciente?._id) return <Alerta alerta={alerta} />

  return (
    <div>

      <Box style={{ marginBottom: 20 }}>
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="xl"
          weight={900}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Añadir Colaborador(a) al Estudiante: {paciente.nombre}
        </Text>
      </Box>

      <Box style={{ marginBottom: 20 }} sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,

      })}>
        <FormularioColaborador />
      </Box>


      {cargando ? 'cargando...' : colaborador?._id && (

        <div>

          <Box>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              size="xl"
              weight={900}
              style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              Resultado:
            </Text>
          </Box>

          <Box style={{ marginTop: 20 }} sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,

          })}>

            <div>

              <Center>
                <Text weight={500}>{colaborador.nombre}</Text>
              </Center>


              <Button style={{ marginTop: 20 }} onClick={() => agregarColaborador({
                email: colaborador.email
              })}>
                Agregar al Estudiante
              </Button>
            </div>
          </Box>
        </div>

      )}


    </div>
  )
}

export default NuevoColaborador