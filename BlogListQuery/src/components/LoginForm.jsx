import { useLoginDispatch } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
function LoginForm() {
    const navigate = useNavigate()
    const login = useLoginDispatch()
    const handleLogin = async (event) => {
        event.preventDefault()
        const user = {
            username: event.target.Username.value,
            password: event.target.Password.value,
        }
        await login(user)
        event.target.Username.value = ''
        event.target.Password.value = ''
        navigate('/')
    }
    return (
        <div>
            <h3>Please Login</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="Username"
                        data-testid="Username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="text"
                        name="Password"
                        data-testid="Password"
                    />
                </Form.Group>
                <Button data-testid="Login" variant="primary" type="submit">
                    login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
