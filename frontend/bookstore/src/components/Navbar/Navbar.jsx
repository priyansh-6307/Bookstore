import React, { useState } from 'react'
import './otm.css'
import {Link} from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import {useSelector} from 'react-redux'


const Navbar = () => {

        const links=[{
            title:"Home",
            link:"/"
        },
        
          {
            title:"All Books",
            link:"/all-books"
          },
          {
            title:"Cart",
            link:"/cart"


          },
        {
            title:"Profile",
            link:"/profile"

        }
    ]
   const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  if(isLoggedIn===false){
    links.splice(2,2)
  }
          
    const [mobilenav,setmobilenav]=useState("hidden")
  return (
    <>
  <nav className="navbar">
    <Link to="/" class='logo'>
        
        
        <img src="https://img.icons8.com/color/100/book.png" alt="" />
        <h3>QuickReads</h3></Link>
    <div className=' Links'>
        <div className="h">
     {links.map((items,i)=>
    <div className='flex items-center'>
    {items.title==="Profile"?<Link 
     to={items.link} className=' px-4 py-1 bg-blue-600 rounded hover:bg-white hover:text-blue-600' key={i}>{items.title}</Link>:<Link 
     to={items.link} className=' menu' key={i}>{items.title}</Link>}
    </div>
    )}
     </div>
    {isLoggedIn===false &&(
      <> <div className="btns">
      <Link to="/Login" className='sign-in'>SignIn</Link>
      <Link to="/Signup"className='sign-up'>SignUp</Link>
      </div></>
    )}
       
    </div> <button className='ioio' onClick={()=>{

      mobilenav==="hidden"?setmobilenav("block"):setmobilenav("hidden")
    }}><IoMenu /></button>
  </nav>


  <div className={`afternav ${mobilenav}`}>
  {links.map((items,i)=><Link 
     to={items.link} className=  {`${mobilenav} menu tom `} key={i} onClick={()=>{
      mobilenav==="hidden"?setmobilenav("block"):setmobilenav("hidden")
     }}>{items.title}</Link>)}
    {isLoggedIn===false  &&(
      <>
        <Link to="/Login" className= {`${mobilenav}  sign-in btnman`} onClick={()=>{
        mobilenav==="hidden"?setmobilenav("block"):setmobilenav("hidden")
      }}>SignIn</Link>
      <Link to="/Signup"className={`${mobilenav} sign-up` } onClick={()=>{
        mobilenav===("hidden")?setmobilenav("block"):setmobilenav("hidden")
      }}>SignUp</Link>
      </>
    )}
  </div>
  </>
  )
}
export default Navbar





