import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    dispatch(setNotification(`You successfully added "${e.target.anecdote.value}".`, 5))

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
