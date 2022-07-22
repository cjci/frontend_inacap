import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';


import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      });
      return;
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})//consulta a la base de datos
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/pacientes')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>

        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Inicio de Sesión
        </Title>

        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <TextInput
            id='email'
            type='email'
            label="Email"
            placeholder="hello@gmail.com"
            size="md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <PasswordInput
            id='password'
            
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            type='submit'
            fullWidth mt="xl"
            size="md"
          >
            Iniciar Sesión
          </Button>

        </form>

        <Text align="center" mt="md">

          <Link to="/registrar">
            ¿No tienes una cuenta? Regístrate
          </Link>

        </Text>

        <Text align="center" mt="md">

          <Link to="/olvide-password">
            Olvide mi Password
          </Link>

        </Text>

      </Paper>

    </div >
  );
}

export default Login