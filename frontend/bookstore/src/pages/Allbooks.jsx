import React,{useState,useEffect} from 'react'  
import Loader from '../components/Loader/Loader';
import axios  from 'axios';
import Bookcart from '../components/BookCard/Bookcart';



const Allbooks = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
      const fetch=async()=>{
          const response=await axios.get("http://localhost:6700/api/v1/get-allbooks")
          setData(response.data.books)
      }
      fetch()
  },[])
return (
  <div className='Recent' style={{height:'auto'}}>
      <h1>All Books</h1>
      {!Data && <div className='Loading'><Loader/></div>}
      <div className="recentbook">
        
          {Data && Data.map((items,i)=><div key={i}><Bookcart data={items}/></div>)}
      </div>
  </div>
  )
}

export default Allbooks