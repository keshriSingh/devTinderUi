import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from './Slices/UserSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/BaseUrl';

function Login() {
    const [emailId,setEmailId] = useState('keshri@gmail.com');
    const [password,setPassword] = useState('Keshri@123');
    const [err,setErr] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try {
          const res = await axios.post(BASE_URL+"/auth/login",{
            emailId,
            password
        },
        {withCredentials:true}
    )
    dispatch(addUser(res.data));
    return navigate('/');
        } catch (error) {
          setErr(error.response?.data||"Something went wrong")
        }
    };

  return (
    <div className='mx-auto my-24 flex items-center justify-center'>
    <fieldset className=" h-96 fieldset bg-base-300 border-base-300 flex flex-col justify-between rounded-box w-xs border p-4">
    <legend className="mx-auto mt-4 pt-12 font-semibold text-xl ">Login</legend>

    <label className="label font-semibold">Email</label>
    <input type="email" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} className="input" placeholder="Email" />

   <label className="label font-semibold">Password</label>
   <input type="text" value={password}  onChange={(e)=>{setPassword(e.target.value)}} className="input" placeholder="Password" />
   {err&& <p className='text-red-500 text-md font-semibold'>{err}</p>}
   <p className='mt-2'>new user? <span onClick={()=>{ navigate('/signup')}} className='text-blue-500 underline cursor-pointer'>SignUp</span></p>
     <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
 </fieldset>
    </div>
  )
}

export default Login
