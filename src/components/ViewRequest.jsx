import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from './Slices/RequestSlice';

function ViewRequest() {
    const dispatch = useDispatch();
    const requests = useSelector((state)=>state.request)
    const reviewConnection= async()=>{
        try {
            const res = await axios.get(BASE_URL+"/connection/user/request/received",{withCredentials:true})
        dispatch(addRequest(res?.data?.data));
        } catch (error) {
            console.error(error)
        }
    }

    const handleRequest = async(_id,status)=>{
        try {
             await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        reviewConnection();
    },[])

  return (
    <div>
        <div className='flex flex-col items-center my-6'>
      <h1 className='text-3xl font-semibold'>Requests</h1>
     <div className='w-2/3 flex flex-col mt-6 gap-3'>
         {requests?.map((request)=>{
        return ( 
     <div key={request._id} className="request-card flex bg-base-300 p-4 rounded-2xl relative items-center">
                    <img className="w-16 h-16 object-cover object-top rounded-full mx-4" src={request.fromUserId.photoUrl} alt="Profile"/>
                    <div className="flex-1 mr-4 ">
                        <h3 className="text-lg font-semibold text-emerald-300">{request.fromUserId.firstName}</h3>
                        <p className="text-gray-400">{request.fromUserId.about}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button onClick={()=>{handleRequest(request._id,"rejected")}} className="btn btn-error">Reject</button>
                        <button onClick={()=>{handleRequest(request._id,'accepted')}} className="btn btn-success">Accept</button>
                    </div>
                </div>
        )
        })}
     </div>
    </div>
    </div>
  )
}

export default ViewRequest
