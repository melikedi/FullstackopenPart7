import { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { useGetById } from '../context/UsersContext'
import { Table } from 'react-bootstrap'
const User = () => {
    const userById = useGetById()
    const match = useMatch('/users/:id')
    const user = match ? userById(match.params.id) : null

    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name} </h2>
            <Table striped>
                <thead>
                    <tr>
                        <th scope="col">Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {user.blogs.map((b) => (
                        <tr key={b.id}>
                            <td>{b.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default User
