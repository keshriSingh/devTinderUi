import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/BaseUrl';
import { removeUser } from './Slices/UserSlice';
import { Link, useNavigate } from 'react-router';
import { removeFeed } from './Slices/FeedSlice';
import { removeConnection } from './Slices/ConnectedSlice';

function Navbar() {
  const user = useSelector((state)=>state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      await axios.post(BASE_URL+'/auth/logout',{},{withCredentials:true})
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
<div className="navbar bg-base-200 shadow-md px-5">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl"><img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/512/10484/10484062.png" alt="icon" />DevTinder</Link>
  </div>
  {user&&<div className="flex gap-2 items-center">
    <p>welcome {user.firstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'} className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to={"/Connection"}>Connection</Link></li>
        <li><Link to={"/request"}>Requests</Link></li>
        <li onClick={handleLogout}><Link>Logout</Link></li>
      </ul>
    </div>
  </div>}
</div>
  )
}

export default Navbar
