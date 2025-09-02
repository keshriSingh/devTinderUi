import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector((state)=>state.user);
  return (
    <div className=''>
     {user&&<EditProfile user={user}/>}
    </div>
  )
}

export default Profile
