import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        replaceBlog(state, action) {
            const updatedBlog = action.payload
            return state
                .map((blog) =>
                    blog.id !== updatedBlog.id ? blog : updatedBlog,
                )
                .sort((b1, b2) => {
                    return b2.likes - b1.likes
                })
        },
        removeBlog(state, action) {
            const id = action.payload
            return state
                .filter((b) => b.id !== id)
                .sort((b1, b2) => {
                    return b2.likes - b1.likes
                })
        },
    },
})
export default blogSlice.reducer
export const { replaceBlog, setBlogs, appendBlog, removeBlog } =
    blogSlice.actions

export const setToken = (newToken) => {
    return async (dispatch) => {
        blogService.setToken(newToken)
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        const blogsSorted = blogs.sort((b1, b2) => {
            return b2.likes - b1.likes
        })
        dispatch(setBlogs(blogsSorted))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(id)
            dispatch(removeBlog(id))
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', message: exception.message },
                    10,
                ),
            )
        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 }
            await blogService.updateBlog(updatedBlog)
            dispatch(replaceBlog(updatedBlog))
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', message: exception.message },
                    10,
                ),
            )
        }
    }
}

export const createBlog = (content, userName) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.createBlog(content)
            newBlog.username = userName
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        type: 'info',
                        message: `a new blog ${newBlog.title} by ${newBlog.author} is added`,
                    },
                    10,
                ),
            )
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', message: exception.message },
                    10,
                ),
            )
        }
    }
}
