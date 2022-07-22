import { Navbar, AppShell, Button, Text, Divider, Container, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const Sidebar = () => {
    const { auth } = useAuth();
    /* console.log(auth); */
    return (
        <Box
            width={{ base: 100 }}
            height={10}
            p="xs"
            sx={(theme) => ({ backgroundColor: theme.colors.gray[0], height: 700 })}>



            <Text style={{ marginBottom: 10 }} weight={500}> Hola: {auth.nombre} </Text>

            <Button >
                <Link style={{ textDecoration: 'none', color: 'white' }}
                    to="crear-paciente"
                >
                    Nuevo Estudiante
                </Link>
            </Button>



        </Box>


    )
}

export default Sidebar