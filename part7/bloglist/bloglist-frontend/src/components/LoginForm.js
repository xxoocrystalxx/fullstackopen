import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            id="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          password
          <Form.Control
            type="password"
            value={password}
            id="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" id="login-button" variant="primary">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
