import React from 'react'
import { Link } from 'react-router';

function ConnetionList({user}) {
    const {firstName,about,photoUrl} = user;

   

  return (
      <div className='flex bg-base-300 p-2 rounded-lg relative items-center'>
        <img className='w-16 h-16 object-cover object-top rounded-4xl mx-4 mr-8 ' src={photoUrl} alt="Photo" />
        <div >
        <h1 className='text-xl font-semibold text-emerald-300'>{firstName}</h1>
        <p className='text-gray-300'>{about}</p>
        </div>
        <div className='right-10 absolute'>
          <Link to={"/chat/"+user._id}><button className='btn btn-primary right-0'>Chat</button></Link>
        </div>
      </div>
  )
}

export default ConnetionList
