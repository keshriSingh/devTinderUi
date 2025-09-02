import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/BaseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from './Slices/ConnectedSlice';
import ConnetionList from './ConnetionList';

function Connection() {
    const dispatch = useDispatch();
    const connectedUser = useSelector((state)=>state.connected);
    const connected = async()=>{
        const res = await axios.get(BASE_URL+'/connection/user/connected',{withCredentials:true})
        dispatch(addConnection(res?.data?.data))
    }

    useEffect(()=>{
        connected()
    },[])
  return (
    <div className='flex flex-col items-center my-6'>
      <h1 className='text-3xl font-semibold'>connections</h1>
     <div className='w-2/3 mt-6 flex gap-3 flex-col'>
         {connectedUser?.map((user)=>{
        return <ConnetionList key={user._id} user={user}/>
        })}
     </div>
    </div>
  )
}

export default Connection
