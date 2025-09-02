import { Outlet, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import axios from "axios"
import { BASE_URL } from "./utils/BaseUrl"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "./components/Slices/UserSlice"

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state=>state?.user));
  const fetchUser = async()=>{
    try {
     if(!user){ const res = await axios.get(BASE_URL+'/user/getProfile',{withCredentials:true})
      dispatch(addUser(res.data));}
    } catch (error) {
      if(error.status==401){
        navigate('/login')
      }
      console.error(error.message);
    }
  }

  useEffect(()=>{
      fetchUser();
  },[])

  return (
   <div className="h-screen">
   <Navbar/>
   <Outlet/>
   <Footer/>
   </div>
  )
}

export default App
