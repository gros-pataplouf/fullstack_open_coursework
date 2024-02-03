import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: '', 
    reducers: {
        setMessage(state, action){
            return action.payload
        },
        removeMessage() {
            return ''
        }
    }
})

export default messageSlice.reducer
export const { setMessage, removeMessage } = messageSlice.actions