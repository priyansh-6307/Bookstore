import React, { useState,useEffect } from 'react'
import "./Recent.css"
import axios from "axios"
import Bookcart from '../BookCard/Bookcart';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
    const [Data,setData]=useState();
    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("http://localhost:6700/api/v1/get-recent-books")
            setData(response.data.books)
        }
        fetch()
    },[])
  return (
    <div className='Recent'>
        <h1>Recently Added Books..</h1>
        {!Data && <div className='Loading'><Loader/></div>}
        <div className="recentbook ">
          
            {Data && Data.map((items,i)=><div key={i}><Bookcart data={items}/></div>)}
        </div>
    </div>
  )
}

export default RecentlyAdded

