import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(addAnecdoteAction(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;
