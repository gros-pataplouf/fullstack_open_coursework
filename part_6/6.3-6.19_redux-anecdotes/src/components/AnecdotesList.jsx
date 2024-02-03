import { useDispatch, useSelector } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/messageReducer";
import { setAnecdotes } from "../reducers/anecdoteReducer";
import { anecdotesService } from "../services/anecdotes";
import { useEffect } from "react";
const AnecdotesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService.getAll()
    .then(response => dispatch(setAnecdotes(response.data)))
  },[])
  const anecdotes = useSelector(state => { 
    console.log(state.anecdotes)
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))

    }
);

  const vote = (id) => {
    dispatch(upvote(id));
    const upvotedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setMessage(`You voted "${upvotedAnecdote.content}". `))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  };
  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdotesList;
