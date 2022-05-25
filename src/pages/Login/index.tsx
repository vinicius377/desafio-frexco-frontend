import { Container, TextField, Button } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ContextUser } from '../../context/user-context'
import api from '../../services/api'

window.document.title = 'Entrar'
function Login() {
  const { register, handleSubmit } = useForm()
  const { setToken, setUser } = useContext(ContextUser)
  const [err, setErr] = useState(false)

  const createProduct = handleSubmit(data => {
    if (!setUser || !setToken) {
      return
    }

    api
      .post('/login', data)
      .then(result => {
        setErr(false)
        setUser(result.data.data)
        setToken(result.data.token)
      })
      .catch(e => {
        if (e.response.status == 401) {
          setErr(true)
          return
        }
        throw new Error(e)
      })
  })
  return (
    <Container
      component="form"
      sx={{ padding: 5, backgroundColor: '#F1F1F1' }}
      onSubmit={createProduct}
    >
      <h1>Login</h1>
      <section
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <TextField
          variant="standard"
          {...register('email')}
          label="Email"
          required
          error={err}
          helperText={err && 'Email ou senha inválidos!'}
        />
        <TextField
          variant="standard"
          {...register('password')}
          label="Senha"
          type="password"
          required
          error={err}
          helperText={err && 'Email ou senha inválidos!'}
        />

        <Button type="submit" variant="contained" color="success">
          Entrar
        </Button>
      </section>
    </Container>
  )
}

export default Login
