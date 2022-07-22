import { Outlet } from 'react-router-dom';

import { Container } from '@mantine/core';


const AuthLayout = () => {
    return (
        <div>

            <Container fluid>

                <Outlet />

            </Container>

        </div>
    )
}

export default AuthLayout
