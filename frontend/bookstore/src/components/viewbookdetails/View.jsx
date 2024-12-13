import { useParams } from 'react-router-dom'
import React,{useState,useEffect} from 'react'  
import Loader from '../Loader/Loader';
import axios  from 'axios';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";




const View = () => {
    const {id}=useParams()
    const [Data,setData]=useState()
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector(((state)=>state.auth.role))


    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get(`http://localhost:6700/api/v1/get-book-by-id/${id}`)
            setData(response.data.book)
            
         
            
    }
  fetch();
        
    },[])
    const headers={
     id: localStorage.getItem("id"),
     authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const addFavourites=async()=>{
      const body={bookid:id}
    const response=await axios.put("http://localhost:6700/api/v1/add-book-to-favourite",body,{headers});
      alert(response.data.message)
    }

    const handleCart=async()=>{
      const body = { id:localStorage.getItem("id"), bookid: id }; 
      const response=await axios.put("http://localhost:6700/api/v1/add-to-cart",body,{headers})
      alert(response.data.message)
    }
    
    
    return (
    <div className='Main'>
        {!Data?(
            <Loader/>
        ):(
        <>
        <div className='flex md:px-12  gap-8 px-4 py-8 lg:flex-row   flex-col '>
        <div className='  w-full  lg:w-3/6 '>
       <div className=' flex lg:flex-row flex-col rounded  bg-zinc-900 p-12 justify-around'> 
        <img src={Data.url}alt={Data.title} className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
        {isLoggedIn===true && role==='user' && (<div className='flex flex-row lg:mt-0 mt-4 lg:flex-col items-center justify-between lg:justify-start '>
          <button className='bg-white rounded-[50%] lg:rounded-full text-3xl  p-2 hover:bg-blue-500 hover:text-white transition-all duration-300 ' onClick={addFavourites}><FaHeart /></button>
          <button className='bg-white rounded-full text-3xl mt-4 p-2 hover:bg-blue-500 hover:text-white transition-all duration-300' onClick={handleCart}><FaShoppingCart />
          </button>
        </div>)}

        {isLoggedIn===true && role==='admin' && (<div className='flex flex-row lg:mt-0 mt-4 lg:flex-col items-center justify-between lg:justify-start '>
          <button className='bg-white rounded-[50%] lg:rounded-full text-3xl  p-2 hover:bg-blue-500 hover:text-white transition-all duration-300'><MdEdit />
          </button>
          <button className='bg-white rounded-full text-3xl mt-4 p-2 hover:bg-blue-500 hover:text-white transition-all duration-300'><MdDelete />
          </button>
        </div>)}
        </div>
        
        
        </div>
            <div className='div2 p-4 w-100vw lg:w-3/6'>
                <h1 className='text-4xl text-zinc-800 font-semibold'>{Data.title}</h1>
                <p className='text-zinc-700 mt-1'>By {Data.author}</p>
                <p className='text-zinc-900 mt-4 text-xl'>{Data.desc}</p>
                <p className='font-semibold  flex mt-4 items-center justify-start text-blue-950'>Language : {Data.language}</p>
                <p className='mt-4 items-center justify-start text-zinc-900 text-3xl font-semibold'>{Data.price}</p>
               
            </div>
            </div>
            </>
            )} 
        
    </div>
    
  )
}

export default View;