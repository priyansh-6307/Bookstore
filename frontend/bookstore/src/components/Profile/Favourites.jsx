
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Bookcart from '../BookCard/Bookcart'
import { FcBookmark } from "react-icons/fc";
const Favourites = () => {
  const [FavouritesBooks,setFavouritesBooks]=useState()
  const headers={
    id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch=async()=>{
      const response= await axios.get("http://localhost:6700/api/v1/get-favourite-books",{headers})
      setFavouritesBooks(response.data.data)
    }
    fetch()
  },[FavouritesBooks]
)
  return (<>
    {FavouritesBooks?.length===0 && <div className='font-semibold flex w-full  justify-center items-center h-screen text-gray-300 text-4xl' >No Favourite Books <FcBookmark /></div>}
    <div className='grid grid-cols-4'>
     
      {FavouritesBooks && FavouritesBooks.map((items,i)=>(
        <div key={i}>
      <Bookcart data={items} favourite={true}/>
      
      </div>))}
    </div>
    </>
  )
}

export default Favourites