import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/messageReducer";
import { anecdotesService } from "../services/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    const anecdote = await anecdotesService.create(e.target.anecdote.value)
    dispatch(addAnecdote(anecdote.data));
    dispatch(setMessage(`You successfully added "${e.target.anecdote.value}".`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;
