const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPVOTE": {
      const upvotedAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload,
      );
      const upvotedAnecdoteNew = {
        ...upvotedAnecdote,
        votes: upvotedAnecdote.votes + 1,
      };
      return state
        .toSpliced(state.indexOf(upvotedAnecdote), 1, upvotedAnecdoteNew)
        .toSorted((a, b) => b.votes - a.votes);
    }
    case "ADD_NEW":
      return state.concat(action.payload); // no sorting necessary, new anecdote always has 0 votes
    default:
      return state.toSorted((a, b) => b.votes - a.votes);
  }
};

export const upvoteAction = (id) => {
  return {
    type: "UPVOTE",
    payload: id,
  };
};

export const addAnecdoteAction = (content) => {
  return {
    type: "ADD_NEW",
    payload: asObject(content),
  };
};

export default anecdoteReducer;
