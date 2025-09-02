import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/BaseUrl'
import { useDispatch } from 'react-redux'
import { addUser } from './Slices/UserSlice'

function EditProfile({user}) {
    const [firstName,setFirstName] = useState(user.firstName)
    const [age,setAge] = useState(user.age)
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl)
    const [about,setAbout] = useState(user.about)
    const [msg,setMsg] = useState(false)
    const [err,setErr] = useState('')
    const dispatch = useDispatch();

    const handleSave = async()=>{
        try {
        const res = await axios.patch(BASE_URL+'/user/profile/edit',{
            firstName,
            age,
            photoUrl,
            about,
        },{withCredentials:true})
        setMsg(true)
        dispatch(addUser(res?.data));
        setTimeout(() => {
            setMsg(false)
        },2000);
          
        } catch (err) {
          console.log(err)
          setErr(err.message)
        }
    }

  return (
    <div className='flex my-17 justify-center gap-18 '>
       <div>
    {msg && <div className="toast toast-top toast-center my-14 ">
     <div className="alert alert-success">
    <span className='text-white'>Profile Saved successfully</span>
  </div>
  </div>}

    <fieldset className=" fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
    <h2 className="mx-auto font-semibold text-xl">Edit Profile</h2>

    <label className="label font-semibold">Name:</label>
    <input type="email" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="input"  placeholder='name' />

   <label className="label font-semibold">Age:</label>
   <input type="text" value={age}  onChange={(e)=>{setAge(e.target.value)}} className="input" placeholder='age' />

     <label className="label font-semibold">Photo:</label>
   <input type="text" value={photoUrl}  onChange={(e)=>{setPhotoUrl(e.target.value)}} className="input" placeholder='photo' />

     <label className="label font-semibold">About:</label>
     <textarea className="textarea textarea-ghost" value={about} placeholder="Bio" onChange={(e)=>setAbout(e.target.value)}></textarea>

     {err&&<p className='text-xl text-red-500'>Error: {err} </p>}

     <button className="btn btn-neutral mt-4" onClick={handleSave}>Save Profile</button>
 </fieldset>
    </div>
     <div className="card bg-base-300 w-80 shadow-sm request ">
  <figure>
    <img className='h-72 w-full object-cover object-top'
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body flex items-center">
    <h2 className="card-title">{firstName}</h2>
    {age&& <h2>Age:{age}</h2>}
    {about&& <p>{about}</p>}
    <div className="card-actions justify-end">
      <button className="btn btn-error" >ignore</button>
      <button className="btn btn-success">interested</button>
    </div>
   </div>
</div>
    </div>
  )
}

export default EditProfile
