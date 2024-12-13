import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Bookcart = ({data,favourite}) => {

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  }
  
  const handleRemoveBook =async()=>{
    const response =await axios.put("http://localhost:6700/api/v1/remove-book-from-favourite",{},{headers})
    alert(response.data.message)
  }
  
 
  return (
    <div className='ttt bg-zinc-800 rounded p-4 ml-[10px] mb-[10px] flex items-center flex-col justify-between min-h-[550px]'>
    <Link to={`/view-Book-details/${data._id}`}>
    <div className=''>
   <div className='bg-zinc-900 rounded flex items-center justify-center'><img src={data.url} alt="/" /></div>
   <h2 className='mt-2 align-bottom text-xl text-white font-semibold'>{data.title}</h2>
   <p className='mt-2 align-bottom text-zinc-400 font-semibold'>By {data.author}</p>
   <h6 className='mt-2 align-bottom text-zinc-200 font-semibold text-xl'>₹{data.price}</h6>
  
    </div>
    
    
    </Link>
 
    {favourite && (
       <button className='bg-red-500  px-4 text-white font-semibold py-2 rounded border-yellow-500' onClick={handleRemoveBook}>Remove</button>
    )}
    </div>
  )
}

export default Bookcart