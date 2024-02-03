import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: 'test message', 
    reducers: {
        messageAction(state, action){
            return action.payload
        }
    }
})

export default messageSlice.reducer
export const { messageAction } = messageSlice.actions