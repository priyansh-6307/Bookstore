import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios';
import { TbMoodEmptyFilled } from "react-icons/tb";
import { Navigate, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";






const Cart = () => {
 const navigate= useNavigate()
  const [Cart,setCart]= useState()
  const [Total,setTotal]=useState(0)
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`

  }


  useEffect(()=>{
    const fetch = async()=>{
      const response= await axios.get("http://localhost:6700/api/v1/all-books-of-cart",{headers})
      setCart(response.data.data)
      
     
    }
    fetch()
  },[])
  useEffect(()=>{
    console.log(Cart)
  },[Cart])
  const deleteitem=async(bookid)=>{
    const headers={
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const body={
      id:localStorage.getItem("id"),
      bookid:bookid
    }
const response= await axios.put("http://localhost:6700/api/v1/remove-from-cart",body,{headers})
alert(response.data.message)
setCart(Cart.filter(item => item._id !== bookid))

  }
  useEffect(()=>{
  if(Cart && Cart.length>0){
    let total=0;
    Cart.forEach((i)=>{
    total+=parseFloat(i.price)
   
    })
    setTotal(total)
  }
  },[Cart])
  useEffect(()=>{
    console.log(Total)
  },[Cart])
  const Placeorder=async()=>{
    
    const headers={
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const body={
      order: Cart.map(item => ({ id:item._id })),
      id:localStorage.getItem("id")
    }
    try {
      const response= await axios.post("http://localhost:6700/api/v1/place-order",body,{headers})
      alert(response.data.message)
      navigate("/profile/orderHistory")
    } catch (err) {
      
      console.log(err)
    }
    
  }
  return (
    <>
  <div>
    {!Cart && <Loader/>}
    {Cart && Cart?.length===0 &&(
      <div className='h-screen text-gray-400 text-5xl font-semibold w-full flex items-center justify-center '>
        Cart is Empty <span className='text-yellow-400 text-center mt-3'> <TbMoodEmptyFilled /></span>
      </div>
    )}

   
  </div>
{Cart && Cart?.length>0 &&(
<div className='h-screen'>
<h1 className='text-5xl lg:text-6xl font-semibold text-gray-400'>Your Cart </h1>

{Cart.map((items,i)=>{
 return( <div className='w-full my-4 rounded flex flex-xol md:flex-row p-4 bg-zinc-800 justify-between items-center'key={i}>
    <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
    <div className='w-full md:w-auto'>
      <h1 className='text-white text-2xl font-semibold'>{items.title}</h1>
      <p className='text-gray-300 '>{items.desc.slice(0,100)}...</p>
   

    </div>
<div className='flex items-center justify-between'>
  <h2 className='text-white font-semibold text-2xl mr-[10px]'>{items.price}</h2>
  <button className=' bg-white rounded px-1 py-1 text-red-600 ml-[4px]' onClick={() => deleteitem(items._id)}><MdDelete /></button>
</div>
  </div>)
})}
{Cart && Cart.length>0 &&(

<div className='mt-4 w-full flex items-center justify-end'>
<div className='p-2 bg-zinc-800 rounded-xl'>

<div className='w-100%  '>
  <h1 className='text-2xl text-white w-full text-center mb-4 font-semibold'>Total Amount</h1>
  <div className='flex items-center justify-between'>
    <h1 className='text-white ml-1 py-2 text-xl font-semibold'>{Cart.length} Books</h1>
    <h1 className='text-white ml-1 py-2 text-xl font-semibold'> ₹ {Total}</h1>
  </div>
  <button className='bg-blue-500 rounded  text-white px-8 py-2 font-semibold hover:text-blue-500 hover:bg-white cursor-pointer transition-all duration-300 ' onClick={Placeorder} >
    Place Your Order
  </button>
</div>






</div>
</div>


)}



</div>
)}
 
 </>
  )
}

export default Cart;