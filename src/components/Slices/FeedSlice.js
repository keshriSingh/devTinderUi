import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:()=>{
            return null;
        },
        removeUserFromFeed:(state,action)=>{
            const newArray = state.filter((e)=>e._id!==action.payload)
            return newArray;
        }
    }
})

export const {addFeed,removeFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;