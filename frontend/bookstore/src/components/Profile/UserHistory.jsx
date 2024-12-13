import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
// import { response } from 'express';
import {Link} from "react-router-dom"  


const UserHistory = () => {
  const [OrderHistory,setOrderHistory]=useState()
    const headers={
      id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}` 
  }

  useEffect(()=>{
const fetch= async()=>{
  const response=await axios.get("http://localhost:6700/api/v1/get-order-history",{headers})
  setOrderHistory(response.data.data)
}
fetch()
  }
  ,[])
  return (
    <>
    {!OrderHistory &&(
      <div className='h-[100%] flex items-center justify-center'><Loader/></div>
    )}

    {OrderHistory && OrderHistory.length===0 &&(
      <div>
        <h1 className='h-[100%] flex items-center justify-start text-zinc-800 font-2xl'>No Order History</h1></div>
    )}
    {OrderHistory && OrderHistory.length>0 && (
      <div className='h-[100vh] md:p-4 p-0 text-zinc-600'>
        <h1 className='font-semibold md:tetxt-5xl text-4xl mb-8'>Your Order History</h1>
    <div className='bg-zinc-800 w-full rounded flex py-2 px-4 gap-4'>
      <div className='w-[3%]'>
        <h1 className='text-zinc-200 text-center'>Sr.</h1>
      </div>
   
      <div className='w-[16%]'><h1 className='text-zinc-200'>Status</h1></div>
      <div className='max-w-none md:w-[5%] hidden md:block'><h1 className='text-zinc-200'>Mode</h1></div>

   </div>

  {OrderHistory.map((items,i)=>(
    <div className='bg-zinc-800 text-zinc-200 flex gap-4  hover:cursor-pointer'>

      <div className='w-[3%] ml-7'><h1>{i+1}</h1></div>
     
      <div className='w-[19%] flex flex-column justify-between'>
        <h1 className='font-semibold'>
          {items.status=="Order Placed" ?(
            <div className='text-green-500'>{items.status}</div>
          ) : items.status=="Canceled" ?(
            <div className='text-red-600'>{items.status}</div>
          ):(items.status)}
        </h1>
        <div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className='text-sm text-zinc-200'>COD</h1>
          </div>
        </div>
      </div>

    </div>
  ))}

      </div>
    )}
    </>
  )
}

export default UserHistory



