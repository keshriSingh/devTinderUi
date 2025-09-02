import axios from 'axios';
import React  from 'react'
import { BASE_URL } from '../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from './Slices/FeedSlice';

function UserCard({feed}) {
  const {firstName,age,about,photoUrl} = feed;
  const dispatch = useDispatch();
  const handleSendRequest = async(status,_id)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true})
      dispatch(removeUserFromFeed(res?.data?.data?.toUserId));
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card bg-base-300 h-4/5 w-80 shadow-sm request absolute">
  <figure>
    <img className='h-72 w-full object-cover object-top'
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body flex items-center">
    <h2 className="card-title">{firstName}</h2>
    {age&&  <h2>Age:{age}</h2>}
    {about&& <p>{about}</p>}
    <div className="card-actions justify-end">
      <button className="btn btn-error" onClick={()=>handleSendRequest("ignore",feed._id)}>ignore</button>
      <button className="btn btn-success" onClick={()=>handleSendRequest("interested",feed._id)}>interested</button>
    </div>
   </div>
</div>
  )
}

export default UserCard
