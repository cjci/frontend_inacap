import { Button, Group, Box, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form'

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';


const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobanToken = async () => {
      try {
        await clienteAxios(`/usuarios/lost-password/${token}`)
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    return () => { comprobanToken() };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener como minimo 6 caracteres",
        error: true
      })
      return;
    }

    try {
      const url = `/usuarios/lost-password/${token}`
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta;

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <h1>Ingresa tu nuevo password</h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form onSubmit={handleSubmit}>

          <PasswordInput
            id='password'
            label="Nuevo Password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Group position="right" mt="md">
            <Button type="submit">Guardar Nuevo Password</Button>
          </Group>
        </form>
      )}

      {passwordModificado && (
        <div>
          <Text align="center" mt="md">

            <Link to="/">
              Iniciar Sesión
            </Link>

          </Text>

        </div>
      )}

    </Box>
  )
}

export default NuevoPassword
