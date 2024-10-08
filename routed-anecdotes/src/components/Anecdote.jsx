import { PropTypes } from 'prop-types'
const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div>
        <br/>
        <div>for more info see <a href = {anecdote.info}>{anecdote.info}</a></div>
      </div>
    )  
  }

export default Anecdote
Anecdote.propTypes = {
    anecdote: PropTypes.object
}