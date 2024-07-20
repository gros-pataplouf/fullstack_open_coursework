const initialState = {type: '', content: ''}



export const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'RESET':
            return initialState
        default:
            return state
    }
}


export const createNotification = (text, type) => {
    return {
      type: 'SET',
      payload: {
        text,
        type
      }
    }
  }
  
  export const eraseNotification = () => {
    return {
      type: 'RESET',
    }
  }
  