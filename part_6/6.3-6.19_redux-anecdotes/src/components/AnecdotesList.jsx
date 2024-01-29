import { useDispatch, useSelector } from "react-redux";
import { upvoteAction } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector(state => { 
    console.log(state.anecdotes)
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))

    }
);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upvoteAction(id));
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
