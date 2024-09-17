import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
function LoginForm() {
    const dispatch = useDispatch()
    const handleLogin = async (e) => {
        e.preventDefault()
        const credentials = {
            username: e.target.Username.value,
            password: e.target.Password.value,
        }
        e.target.Username.value = ''
        e.target.Password.value = ''
        dispatch(login(credentials))
    }
    return (
        <div>
            <h3>Please Login</h3>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input type="text" name="Username" data-testid="Username" />
                </div>
                <div>
                    password:
                    <input type="text" name="Password" data-testid="Password" />
                </div>
                <button data-testid="Login" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}
export default LoginForm
