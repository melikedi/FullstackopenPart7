import { useBlogsValue, useDeleteBlog } from '../context/BlogContext'
import { useUserValue } from '../context/UserContext'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const BlogList = () => {
    const deleteBlog = useDeleteBlog()
    const titleStyle = {
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
    const handleRemoveBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }
    }
    const getRemoveButtonStyle = (blog) => {
        return { display: blog.username === user.name ? '' : 'none' }
    }
    const user = useUserValue()
    const blogs = useBlogsValue()
    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th scope="col">Blog Name</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((b) => (
                        <tr key={b.id}>
                            <td>
                                <Link to={`/blogs/${b.id}`}>
                                    <span style={titleStyle}>{b.title}</span> by{' '}
                                    {b.author}
                                </Link>
                            </td>
                            <td>
                                <Button
                                    style={getRemoveButtonStyle(b)}
                                    variant="primary"
                                    onClick={() => {
                                        handleRemoveBlog(b)
                                    }}
                                >
                                    remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default BlogList
