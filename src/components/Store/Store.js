import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Slices/UserSlice';
import feedReducer from '../Slices/FeedSlice';
import connectedReducer from '../Slices/ConnectedSlice';
import requestReducer from '../Slices/RequestSlice';

const store = configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connected:connectedReducer,
      request:requestReducer
    },
})

export default store;