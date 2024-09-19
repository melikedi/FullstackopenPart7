import { useState } from 'react'
import {
    useUpdateBlog,
    useGetById,
    useAddComment,
} from '../context/BlogContext'
import { useMatch } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
const Blog = () => {
    const blogById = useGetById()
    const addComment = useAddComment()
    const match = useMatch('/blogs/:id')
    const blog = match ? blogById(match.params.id) : null
    const updateBlog = useUpdateBlog()
    if (!blog) {
        return null
    }
    const handleAddComment = (e) => {
        e.preventDefault()
        addComment(blog.id, e.target.Content.value)
        e.target.Content.value = ''
    }
    const handleLikeBlog = () => {
        blog.likes = blog.likes + 1
        updateBlog(blog)
    }

    return (
        <div data-testid="blogItem">
            <div>
                <h3>{blog.title}</h3>
                <h4>{blog.author}</h4>
                <a href={blog.url}>{blog.url}</a>
                <div>
                    <span>{blog.likes} likes</span>
                    <Button variant="primary" onClick={handleLikeBlog}>
                        like
                    </Button>
                </div>

                <span>added By {blog.username}</span>
            </div>

            <br />
            <div>
                <h5>comments</h5>
                <Form onSubmit={handleAddComment}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="your comment..."
                            name="Content"
                            data-testid="Content"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        addComment
                    </Button>
                </Form>
                <ul>
                    {blog.comments.map((c) => (
                        <li key={c.id}> {c.content} </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blog
