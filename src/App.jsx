import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Text } from '@mantine/core';

import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Pacientes from './paginas/Pacientes';
import NuevoPaciente from './paginas/NuevoPaciente';
import Paciente from './paginas/Paciente';
import EditarPaciente from './paginas/EditarPaciente';
import NuevoColaborador from './paginas/NuevoColaborador';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>{/* rutas publicas */}

              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />

              <Route path="/pacientes" element={<RutaProtegida />}>{/* ruras privadas */}

                <Route index element={<Pacientes />} />
                <Route path="crear-paciente" element={<NuevoPaciente />} />
                <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
                <Route path=":id" element={<Paciente />} />
                <Route path="editar/:id" element={<EditarPaciente />} />

              </Route>

            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
