import { createSlice } from "@reduxjs/toolkit";

const connectedSlice = createSlice({
    name:'connected',
    initialState:null,
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        },
        removeConnection:()=>{
            return null;
        }
    }
})

export const {addConnection,removeConnection} = connectedSlice.actions;
export default connectedSlice.reducer;