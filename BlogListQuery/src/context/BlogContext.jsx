import { createContext, useContext, useReducer, useEffect } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import { useGetAuth } from './UserContext'
import blogService from '../services/blogs'

const blogReducer = (blogs, action) => {
    switch (action.type) {
        case 'setBlogs':
            return action.payload
        case 'createBlog':
            return [...blogs, action.payload]
        case 'updateBlog':
            return blogs.map((blog) =>
                blog.id !== action.payload.id ? blog : action.payload,
            )
        case 'removeBlog':
            return blogs.filter((blog) => blog.id !== action.id)
        default:
            return blogs
    }
}
export const BlogsContext = createContext()

export const useGetById = () => {
    const blogsAndDispatch = useContext(BlogsContext)
    const blogs = blogsAndDispatch[0]
    return (id) => {
        return blogs.find((b) => b.id === id)
    }
}

export const useBlogsValue = () => {
    const blogsAndDispatch = useContext(BlogsContext)
    return blogsAndDispatch[0]
}
export const useBlogsDispatch = () => {
    const blogsAndDispatch = useContext(BlogsContext)
    return blogsAndDispatch[0]
}
export const useAddComment = () => {
    const queryClient = useQueryClient()
    const notify = useNotificationDispatch()
    const addCommentMutation = useMutation({
        mutationFn: blogService.addComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs'])
        },
        onError: (error) => {
            notify(error.response.data.error)
        },
    })
    return (id, content) => {
        addCommentMutation.mutate({ content, blog: id })
    }
}
export const useUpdateBlog = () => {
    const queryClient = useQueryClient()
    const notify = useNotificationDispatch()
    const updateBlogMutation = useMutation({
        mutationFn: blogService.updateBlog,
        onSuccess: (savedBlog) => {
            queryClient.invalidateQueries(['blogs', 'users'])
        },
        onError: (error) => {
            notify(error.response.data.error)
        },
    })
    return (payload) => {
        updateBlogMutation.mutate(payload)
    }
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient()
    const notify = useNotificationDispatch()
    const deleteBlogMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs', 'users'])
        },
        onError: (error) => {
            notify(error.response.data.error)
        },
    })
    return (payload) => {
        deleteBlogMutation.mutate(payload)
    }
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient()
    const notify = useNotificationDispatch()
    const newBlogMutation = useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: (savedBlog) => {
            queryClient.invalidateQueries(['blogs', 'users'])
            const message = `a new blog ${savedBlog.title} by ${savedBlog.author} is added`

            notify(
                {
                    type: 'info',
                    message,
                },
                10,
            )
        },
        onError: (error) => {
            notify({ type: 'error', message: error.response.data.error }, 10)
        },
    })

    return (payload) => {
        newBlogMutation.mutate(payload)
    }
}

export const BlogContextProvider = ({ children }) => {
    const token = useGetAuth()
    blogService.setToken(token)
    const { data, error, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const [blogs, blogsDispatch] = useReducer(blogReducer, [])
    useEffect(() => {
        if (data) {
            blogsDispatch({ type: 'setBlogs', payload: data })
        }
    }, [data])

    if (isLoading) return <p>Loading...</p>
    if (error)
        return (
            <p>
                Error: {'blogs service not available due to problems in server'}
            </p>
        )

    return (
        <BlogsContext.Provider value={[blogs, blogsDispatch]}>
            {children}
        </BlogsContext.Provider>
    )
}
