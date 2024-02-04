import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upvoteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/messageReducer";
import { anecdotesService } from "../services/anecdotes";

const AnecdotesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[])
  const anecdotes = useSelector(state => { 
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
);
  const vote = async (id) => {
    dispatch(upvoteAnecdote(id));
    const upvotedAnecdote = await anecdotesService.upvote(id)

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