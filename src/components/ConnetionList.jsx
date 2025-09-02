import React from 'react'

function ConnetionList({user}) {
    const {firstName,about,photoUrl} = user;
  return (
      <div className='flex bg-base-300 p-2 rounded-lg'>
        <img className='w-16 h-16 object-cover object-top rounded-4xl mx-4 mr-8 ' src={photoUrl} alt="Photo" />
        <div >
        <h1 className='text-xl font-semibold text-emerald-300'>{firstName}</h1>
        <p className='text-gray-300'>{about}</p>
        </div>
      </div>
  )
}

export default ConnetionList
