import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePacientes from '../hooks/usePacientes';
import useAdmin from '../hooks/useAdmin';
import Ficha from '../components/Ficha';
import Alerta from '../components/Alerta';
import Colaborador from '../components/Colaborador';

import { Text, Box, Button, Group, Card, ScrollArea, Center, SimpleGrid } from '@mantine/core';

import ModalFicha from '../components/ModalFicha';
import ModalEliminarFicha from '../components/ModalEliminarFicha';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';

const Paciente = () => {
  const params = useParams();
  const { obtenerPaciente, paciente, cargando, manejarModal, alerta, eliminarPaciente } = usePacientes();

  const admin = useAdmin()
  console.log(admin)

  useEffect(() => {
    obtenerPaciente(params.id)
  }, []);

  const handleClick = () => {
    if (confirm('¿Deseas eliminar este Estudiante?')) {
      eliminarPaciente(params.id);
    }
  }

  const { nombre } = paciente;
  const { apellidos } = paciente;
  const v = (' ');

  console.log(paciente);

  if (cargando) return 'Cargando...'

  const { msg } = alerta;

  console.log(paciente)

  return (

    <div>

      <SimpleGrid cols={2}>
        <Group>
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
              Estudiante Actual:
            </Text>

            <Box
              style={{ justifyContent: 'space-between', marginBottom: 10 }}
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
              })}>

              <Box>

                <Center>
                  <Text weight={700} >
                    {nombre}{v}
                    {apellidos}

                  </Text>
                </Center>

              </Box>

              <Box style={{ marginTop: 10 }}>

                <Group >

                  {admin && (
                    <Button>
                      <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={`/pacientes/editar/${params.id}`}
                      >
                        datos personales
                      </Link>
                    </Button>
                  )}


                  {admin && (
                    <Box>
                      <Button
                        onClick={handleClick}
                        color="red"

                      >eliminar</Button>
                    </Box>
                  )}

                  <Box>
                    <Button onClick={manejarModal}>
                      Ficha
                    </Button>
                  </Box>

                  <ModalFicha />
                  <ModalEliminarFicha />
                  <ModalEliminarColaborador />

                </Group>

              </Box>

            </Box>

          </Box>
        </Group>

        <Box>

          <Group>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              size="xl"
              weight={900}
              style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              Colaboradores:
            </Text>

            <Button style={{ marginTop: 10 }} size="xs">

              <Link
                style={{ textDecoration: 'none', color: "white" }}
                to={`/pacientes/nuevo-colaborador/${paciente._id}`}
              >
                asignar
              </Link>
            </Button>
          </Group>

          <Box
            style={{ justifyContent: 'space-between', marginBottom: 10, width: 300, marginTop: 10 }}
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
            })}>

            {paciente.colaboradores?.length ?
              paciente.colaboradores?.map(colaborador => (

                <Colaborador
                  key={colaborador._id}
                  colaborador={colaborador}
                />

              ))
              : 'No hay Colabodores para este Estudiante'}

          </Box>
        </Box>

      </SimpleGrid>

      <Box style={{ marginBottom: 20, marginTop: 20 }}>
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="xl"
          weight={900}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Fichas del Estudiante:
        </Text>
      </Box>



      <Box
        style={{ marginBottom: 20 }}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
        })}>

        <ScrollArea style={{ height: 420 }} offsetScrollbars>
          {paciente.fichas?.length ?
            paciente.fichas?.map(ficha => (

              <Ficha
                key={ficha._id}
                ficha={ficha}
              />

            ))
            : 'No hay fichas'}
        </ScrollArea>

      </Box>



    </div>

  )
}

export default Paciente