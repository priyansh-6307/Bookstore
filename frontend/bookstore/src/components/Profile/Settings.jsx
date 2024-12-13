import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'


const Settings = () => {
const [ProfileData,setProfileData]=useState({})
const [Value,setValue]=useState({address:""})
const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}
const change=(e)=>{

const {name,value}=e.target;
setValue({...Value,[name]:value})

}


useEffect(()=>{
  const fetch=async()=>{
const response=await axios.get("http://localhost:6700/api/v1/get-user-information",{headers})

setProfileData(response.data)
setValue({...Value,address:response.data.address})
  }
  fetch()
},[])
const submitAddress= async()=>{
  const response = await axios.put("http://localhost:6700/api/v1/update-address",Value,{headers})
  console.log(response)
}
return (
<>
{!ProfileData && <Loader/>}
{ProfileData && (
  <div className='h-[100%] p-0 md:p-4 text-zinc-700'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
    <div className='flex gap-12'>
  <div className='flex gap-12'>
   <div className=''>
    <label htmlFor="" className='font-semibold'>Username</label>
    <p className='p-2 rounded text-white bg-gray-400 mt-2 font-semibold'>{ProfileData.username}</p>
   </div>
   <div className=''>
    <label htmlFor="" className='font-semibold'>Email</label>
    <p className='p-2 rounded text-white bg-gray-400 mt-2 font-semibold'>{ProfileData.email}</p>
   </div>
  </div>
  </div>
<div className='mt-4 h-[40%]'>
  <label className='font-semibold' htmlFor="">Address</label>
  <textarea name="address"  className='bg-gray-400 ml-2 text-white w-full h-[85%] font-semibold rounded' placeholder='Address' onChange={change} row="5"  id=""value={Value.address}/>
</div>
       <div className='mt-4 flex justify-end'>
        <button onClick={submitAddress} className='bg-blue-600 cursor-pointer px-3 py-2 text-white font-semibold rounded hover:bg-blue-400 '>Update</button>
       </div>
    </div>

  
)}
</>)
} 

  
export default Settings