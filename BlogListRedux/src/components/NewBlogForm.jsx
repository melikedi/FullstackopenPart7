import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
function NewBlogForm({ blogFormRef }) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const addBlog = (e) => {
        blogFormRef.current.toggleVisibility()
        e.preventDefault()
        const newBlog = {
            title: e.target.Title.value,
            author: e.target.Author.value,
            url: e.target.URL.value,
        }
        e.target.Title.value = ''
        e.target.Author.value = ''
        e.target.URL.value = ''
        dispatch(createBlog(newBlog, user.name))
    }
    return (
        <div>
            <h3>Create New</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        name="Title"
                        placeholder="title"
                        data-testid="Title"
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name="Author"
                        placeholder="author"
                        data-testid="Author"
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="URL"
                        placeholder="url"
                        data-testid="Url"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default NewBlogForm
