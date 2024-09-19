import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}
const getAll = async () => {
    const response = await axios.get(baseUrl)
    const blogs = response.data
    if (blogs) {
        blogs.forEach((element) => {
            element.username = element.user.name
        })
        blogs.sort((b1, b2) => {
            return b2.likes - b1.likes
        })
    }

    return blogs
}
const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}
const updateBlog = async (blogToUpdate) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(
        `${baseUrl}/${blogToUpdate.id}`,
        blogToUpdate,
        config,
    )
    return response.data
}
const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}
const addComment = async (commentToAdd) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(
        `${baseUrl}/${commentToAdd.blog}/comments`,
        commentToAdd,
        config,
    )
    return response.data
}

export default {
    getAll,
    createBlog,
    setToken,
    updateBlog,
    deleteBlog,
    addComment,
}
