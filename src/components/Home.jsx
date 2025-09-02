import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/BaseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './Slices/FeedSlice';
import { useNavigate } from 'react-router';
import UserCard from './UserCard';

function Home() {
  const dispatch = useDispatch();
  const feed = useSelector((state)=>state.feed);
  const user = useSelector((state)=>state.user);
  const persistRehydrated = useSelector((state) => state._persist?.rehydrated);
  const navigate = useNavigate();
  const getfeed = async()=>{
    try{
      const res = await axios.get(BASE_URL+'/connection/user/feed',{withCredentials:true});
      dispatch(addFeed(res.data));
      
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
   if(persistRehydrated){
     if(!user){
       return navigate('/login')
      }
    }
    getfeed();
  },[])


    if(!feed){
      return (<h1 className='flex justify-center my-14'>There is no profile to show</h1>)
    }
    if(feed?.length===0){
      return <h1 className='flex justify-center my-14'>There is no profile to show</h1>
    }

   return (
    <div className='h-4/5 flex justify-center pt-14 relative'>
     {feed&& feed.map((people)=><UserCard key={people._id} feed={people}/>)}
    </div>
   )
}

export default Home
