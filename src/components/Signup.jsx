import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { addUser } from './Slices/UserSlice';

function Signup() {
  const [firstName,setFirstName] = useState('');
  const [emailId,setEmailId] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async()=>{
    try {
      const res = await axios.post(BASE_URL+"/auth/signup",{
        firstName,
        emailId,
        password
      },{withCredentials:true})
      dispatch(addUser(res?.data))
      return navigate('/profile');
    } catch (error) {
      setErr(error.response?.data||"Something went wrong")

    }
  }
  return (
  <div className='my-16 flex justify-center'>
     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <h2 className="mx-auto fieldset-legend text-2xl">SignUp</h2>

  <label className="label">Name</label>
  <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Name" />

  <label className="label">Email</label>
  <input type="email" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} placeholder="Email" />


  <label className="label">Password</label>
  <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

  {err&& <p className='text-red-500 text-md font-semibold'>{err}</p>}
  
   <p className='mt-2'>all ready have account? <span onClick={()=>{navigate('/login')}} className='text-blue-500 underline cursor-pointer'>Login</span></p>


  <button onClick={handleSignUp} className="btn btn-neutral mt-4">SignUp</button>
</fieldset>
  </div>
  )
}

export default Signup
