import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { Container, Group, SimpleGrid, Box, Grid } from '@mantine/core'



const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    if (cargando) return 'Cargando...'

    return (
        <>
            {auth._id ?

                (

                    <div >
                        <Header />
                        <Grid columns={24} breakpoints={[{ maxWidth: 755, cols: 1 }]}>

                            <Grid.Col span={4}>
                                <Sidebar />
                            </Grid.Col>


                            <Grid.Col span={20}>
                                <main>
                                    <Outlet />
                                </main>
                            </Grid.Col>

                        </Grid>

                    </div>

                ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida
