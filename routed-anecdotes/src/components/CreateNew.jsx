import { PropTypes } from 'prop-types'

import { useField } from '../hooks/index'
const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content : content.attributes.value,
        author : author.attributes.value,
        info : info.attributes.value,
        votes: 0
      })
    }
    const handleReset= (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
      
    }
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content:<input  {...content.attributes} /> 
          </div>
          <div>
            author:<input  {...author.attributes} /> 
          </div>
          <div>
            url for more info:<input  {...info.attributes} /> 
          </div>
          <input type="submit" value="Create"></input>
          <input type="reset" value="Reset"></input>
         
        </form>
      </div>
    )
  
  }

  export default CreateNew
  CreateNew.propTypes = {
    addNew: PropTypes.func
}