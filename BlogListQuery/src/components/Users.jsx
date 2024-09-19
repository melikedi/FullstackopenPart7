import User from './User'
import { UsersContextProvider } from '../context/UsersContext'
import { useUsersValue } from '../context/UsersContext'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Users = () => {
    const users = useUsersValue()
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Number of Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {' '}
                                    {user.name}
                                </Link>
                            </td>
                            <td> {user.blogs.length} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Users
