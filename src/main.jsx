import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import {Provider} from 'react-redux';
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import store from './components/Store/Store.js';
import Profile from './components/Profile.jsx';
import Connection from './components/Connection.jsx';
import ViewRequest from './components/ViewRequest.jsx';
import ChatWindow from './components/ChatWindow.jsx';


createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<App/>} >
    <Route index element={<Home/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/connection' element={<Connection/>}/>
    <Route path='/request' element={<ViewRequest/>}/>
    <Route path='/chat/:targetUserId' element={<ChatWindow/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
   </Routes>
  </BrowserRouter>
   </Provider>
)
