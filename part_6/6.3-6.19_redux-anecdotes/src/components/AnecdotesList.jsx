import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upvote, setAnecdotes } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/messageReducer";
import { anecdotesService } from "../services/anecdotes";

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
  const vote = async (id) => {
    console.log(id)
    dispatch(upvote(id));
    await anecdotesService.upvote(id)
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