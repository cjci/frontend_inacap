import React from 'react';
import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group } from '@mantine/core';

import {useState} from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';

import clienteAxios from '../config/clienteAxios';

const useStyles = createStyles((theme) => ({  

  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));


const OlvidePassword = () => {

  const [email, setEmail] = useState('');

  const { classes } = useStyles();

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e =>{
    e.preventDefault();

    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/lost-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (

    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Recupera tu Cuenta
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Ingresa tu correo para enviarte las instrucciones
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">

        {msg && <Alerta alerta={alerta} /> }

        <form onSubmit={handleSubmit}>

          <TextInput
            id='email'
            type='email'
            
            label="Email"
            placeholder="correo@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Group position="right" mt="md">
            <Button type="submit">Recuperar contraseña</Button>
          </Group>
        </form>

        <div>
          <Text align="center" mt="md">

            <Link to="/">
              ¿Ya tienes una Cuenta? Inicia Sesión
            </Link>

          </Text>

        </div>
      </Paper>

    </Container>

  )
}

export default OlvidePassword
