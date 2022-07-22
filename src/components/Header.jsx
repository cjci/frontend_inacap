import { Container, Text, Input, Autocomplete, Button, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

import usePacientes from '../hooks/usePacientes';
import useAuth from '../hooks/useAuth';

const Header = () => {

  const { cerrarSesionPacientes, pacientes } = usePacientes();
  const { cerrarSesionAuth } = useAuth();

/*   const pacientesFiltrados = busqueda === '' ? [] : pacientes.filter(paciente => paciente.nombre.tolowerCase.includes(busqueda.tolowerCase() ))
 */
  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionPacientes();
    localStorage.removeItem('token');
  }

  return (

    <div>
      <Container fluid style={{ height: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0]
        })}>

        <Image width={130}
          src="https://portales.inacap.cl/web_resources/themes/portal/img/logoFooter.png"
          alt="Random unsplash image"
        />

        {/*       <Input
        type="search"
        placeholder="Buscar Estudiante"
      /> */}

        {/* <Autocomplete
          
          placeholder="Buscar Estudiante"
          data={['React', 'Angular', 'Svelte', 'Vue']}

        /> */}


        <Button variant="subtle">
          <Link to="/pacientes" style={{ textDecoration: 'none', color: "#1C7ED6" }}>
            Estudiantes
          </Link>
        </Button>

        <Button
          type="button"
          variant="subtle"
          onClick={handleCerrarSesion}
        >
          Cerrar Sesión</Button>

      </Container>
    </div>


  )
}

export default Header;
