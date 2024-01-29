const filterReducer = (state = "", action) => {
switch (action.type) {
    case "FILTER": {
        return action.payload
    }

    default:
    return state;
}
}

export const filterAction = (str) => {
return {
    type: "FILTER",
    payload: str
};
};
  
  export default filterReducer;
  