import { useState, useEffect, useRef } from 'react'
import { initializeBlogs, setToken } from './reducers/blogReducer'
import { getLoggedInUser, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
        if (user !== null) {
            dispatch(setToken(user.token))
        }
    }, [dispatch, user])

    const blogFormRef = useRef()
    if (user === null) {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged-in
                <br />
                <span>
                    <button
                        data-testid="Logout"
                        onClick={() => {
                            dispatch(logout())
                        }}
                    >
                        log out
                    </button>
                </span>
            </p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <br />
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    removeButtonVisible={blog.username === user.name}
                />
            ))}
        </div>
    )
}

export default App
