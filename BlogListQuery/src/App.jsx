import { useRef } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useUserValue } from './context/UserContext'
import User from './components/User'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
const App = () => {
    const blogFormRef = useRef()
    const user = useUserValue()
    return (
        <div className="container">
            <Menu />
            <Notification />
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <div>
                                <h2>blogs</h2>
                                <Togglable
                                    buttonLabel="create new blog"
                                    ref={blogFormRef}
                                >
                                    <NewBlogForm blogFormRef={blogFormRef} />
                                </Togglable>
                                <br />
                                <BlogList />
                            </div>
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route
                    path="/users"
                    element={
                        user ? <Users /> : <Navigate replace to="/login" />
                    }
                />
                <Route path="/users/:id" element={<User />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </div>
    )
}

export default App
