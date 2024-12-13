import React, { useEffect, useState } from 'react'
import Sidear from '../components/Profile/Sidear'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import Mobilenav from '../components/Profile/mobilenav'

const Profile = () => {
    const [Profile,setProfile]=useState();
    const headers={
      id:localStorage.getItem('id'),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    useEffect(()=>{
      const fetch =async()=>{
        const response= await axios.get("http://localhost:6700/api/v1/get-user-information",{ headers })

        setProfile(response.data)
      }
      fetch()
    },[])
  return (
    <div className='bg-white  md:px-12 flex flex-col md:flex-row   py-8'>
     {!Profile && <Loader/>}
     {Profile &&
     <>
      <div className="md:w-1/6 w-full h:auto  lg:h-screen "><Sidear data={Profile}/>
      <Mobilenav />
      </div>
      <div className="md:w-5/6 "><Outlet /></div>
      </>}
    </div>
  )
}

export default Profile