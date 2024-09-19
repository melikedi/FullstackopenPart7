import { useState } from 'react'
import { useCreateBlog } from '../context/BlogContext'
import { Table, Form, Button } from 'react-bootstrap'

function NewBlogForm(props) {
    const createBlog = useCreateBlog()
    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: event.target.Title.value,
            author: event.target.Author.value,
            url: event.target.Url.value,
        }
        createBlog(newBlog)
        props.blogFormRef.current.toggleVisibility()
    }
    return (
        <div>
            <h3>Create New</h3>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="title"
                        name="Title"
                        data-testid="Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="author"
                        name="Author"
                        data-testid="Author"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="url"
                        name="Url"
                        data-testid="Url"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    create
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        props.blogFormRef.current.toggleVisibility()
                    }}
                >
                    Cancel
                </Button>
            </Form>
        </div>
    )
}
export default NewBlogForm
