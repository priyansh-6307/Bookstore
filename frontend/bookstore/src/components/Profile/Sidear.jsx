import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import {authActions} from "../../store/auth"
import { useDispatch } from 'react-redux';

const Sidear = ({data}) => {
  const dispatch= useDispatch()
  const history=useNavigate()
  return(
    <div className='bg-zinc-800 p-4 rounded text-white h-auto lg:h-[100%] flex items-center justify-between flex-col '><div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} className='h-[14vh] rounded-[50%]'/>
    <p className='mt-3 text-l font-semibold'>{data.username}</p>
    <p className='mt-1 text-[15px]'>{data.email}</p>
    <div className='w-full mt-4 h-[1px] bg-zinc-400 hidden lg:block'></div>
    </div>
    <div className='hidden lg:flex items-center flex-col w-full justify-center'>
    <Link to="/profile"
    className=' text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Favourites
    </Link>
    <Link to="/profile/orderHistory"
    className='text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Order history
    </Link>
    <Link to="/profile/settings"
    className='text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Settings
    </Link>
    </div>
    
    <button className='w-full flex items-center  justify-center bg-blue-600 rounded p-3 hover:bg-white font-semibold hover:text-zinc-800 transition-all duration-300' onClick={()=>{
      dispatch(authActions.logout())
      dispatch(authActions.changeRole("user"))
      localStorage.clear("id")
      localStorage.clear("token")
      localStorage.clear("role")
      history("/")
    }} >Logout  <TbLogout className=' m-0.5' />
  
    </button>
    
    </div>
    
  )    
}

export default Sidear;