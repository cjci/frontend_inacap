import clienteAxios from '../config/clienteAxios';

import { TextInput, Button, Group, Box, Text, PasswordInput } from '@mantine/core';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import Alerta from '../components/Alerta';



const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});


  const handleSubmit = async e => {
    /* console.log("REGISTRAR"); */
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return;
    }
    setAlerta({});

    //creando el usuario en la api
    try {
      const { data } = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        { nombre, email, password });
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });

    }
    /* console.log("OUT"); */
  }

  const { msg } = alerta;

  return (

    <Box sx={{ maxWidth: 300 }} mx="auto">
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit}>

        {/* {alerta && <Alerta><Text>Todos los campos son obligatorios</Text></Alerta>} */}

        <TextInput
          id='nombre'
          label="Nombre"
          placeholder="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}

        />

        <TextInput
          id='email'
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}

        />

        <PasswordInput
          id='password'
          label="Password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}

        />

        <PasswordInput
          id='password2'
          mt="sm"
          label="Confirmar password"
          placeholder="password"
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}

        />

        <Group position="right" mt="md">
          <Button type="SUBMIT">Crear Cuenta</Button>
        </Group>

      </form>

      <div>
        <Text align="center" mt="md">

          <Link to="/">
            ¿Ya tienes una Cuenta? Inicia Sesión
          </Link>

        </Text>

      </div>

    </Box>


  )
}

export default Registrar