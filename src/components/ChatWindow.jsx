import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { createSocketConnection } from '../utils/Socket';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/BaseUrl';

function ChatWindow() {
    const {targetUserId} = useParams();
    const user = useSelector((state)=>state.user)
    const [msg,setMsg] = useState([]);
    const [inputMessage,setInputMessage] = useState('')
    const [online,setOnline] = useState(false)

    const fetchChat = async()=>{
      try {
        const res = await axios.get(BASE_URL+'/chat/'+targetUserId,{withCredentials:true});
        setMsg(res?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchChat()
    },[])

    useEffect(()=>{
      if(!user){
      return
    }
    const socket = createSocketConnection();
    socket.emit("joinChat",{userId:user?._id,targetUserId:targetUserId})

    socket.emit('online',{userId:user._id})

    const handleOnline = ({arr}) => {
    setOnline(arr.includes(targetUserId));
    };

  const handleOffline = ({arr}) => {
    setOnline(arr.includes(targetUserId));
  };

    socket.on('isOnline', handleOnline);
    socket.on('offlineUser', handleOffline);

    socket.on("messageReceived",({firstName,userId,photoUrl,chat})=>{
     setMsg((prev)=>[...prev,{senderId:{firstName:firstName,_id:userId,photoUrl:photoUrl},text:chat}])
      })

      return()=>{
        socket.emit('offline',{userId:user._id});
        socket.disconnect();
      }
    },[user,targetUserId]);

    const handleSendMessage = ()=>{
      const socket = createSocketConnection();
      socket.emit("sendMessage",{firstName:user?.firstName,userId:user?._id,targetUserId:targetUserId,chat:inputMessage});
      setInputMessage('');
    }


  return (
    <div className='w-[75vw] flex flex-col mx-auto border-2 border-gray-500 mt-10 h-[70vh]'>
        <h2 className='text-2xl font-bold text-green-400 border-b  border-gray-500 p-3'>Chat
          <span className='text-blue-500 text-sm'>{online?'(online)':''}</span>
        </h2>
        <div className='h-[80%] overflow-y-auto'>
          {msg.map((m,idx)=>
          (user?._id!==m?.senderId?._id)?
            <div key={idx} className="chat chat-start p-2">
              <div className="chat-image avatar">
              <div className="w-10 rounded-full">
               <img
               alt="photo"
               src={m.senderId?.photoUrl}
              />
             </div>
              </div>
              <div className="chat-header">
              {m.senderId?.firstName}
             <time className="text-xs opacity-50">{m.createdAt? 
             `${new Date(m.createdAt).getHours()}:${new Date(m.createdAt).getMinutes()}`
             :`${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`}</time>
             </div>
            <div className="chat-bubble">{m?.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div> :
          <div key={idx} className="chat chat-end p-2">
          <div className="chat-image avatar">
          <div className="w-10 rounded-full">
          <img
          alt="photo"
          src={m.senderId?.photoUrl}
          />
          </div>
          </div>
         <div className="chat-header">
         you
         <time className="text-xs opacity-50">{m.createdAt? 
             `${new Date(m.createdAt).getHours()}:${new Date(m.createdAt).getMinutes()}`
             :`${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`}</time>
        </div>
        <div className="chat-bubble">{m?.text}</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
          )}
        </div>
        <div className='flex h-[10%] items-center border border-gray-400'>
            <input value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} className='w-full h-full p-2 font-semibold bg-black' type="text" />
            <button onClick={handleSendMessage} className='h-full btn btn-secondary '>Send</button>
        </div>
    </div>
  )
}

export default ChatWindow
