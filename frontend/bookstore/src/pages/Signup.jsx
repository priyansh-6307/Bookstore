import React, { useState } from 'react'
import signupImage from './signup.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""
    
  })
  const navigate=useNavigate()
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value})
  }

  const submit=async()=>{
    try {
      if(Values.username===''|| Values.email==='' || Values.password===''  ||Values.address===''   ){
        alert('All fields are required')
        return
      }
      else{
        const response =await axios.post("http://localhost:6700/api/v1/sign-up",Values)
        console.log(response)
        navigate('/Login')
      }
     
      
    } catch (err) {
      alert(err.response.data.message)
    }
  }
  return (
    <div style={{backgroundImage: `url(${signupImage})`}} className=" flex justify-center items-center bg-cover w-full h-auto">
      <div className="bg-white px-6 py-6 rounded-lg md:w-[75%] lg:w-2/6 mt-20 mb-20">
    <p className='text-zinc-900 font-semibold text-xl w-full text-center'>Sign Up</p>
    <div className="firstname mt-8">
      <label htmlFor="">Username</label>
      <input 
      type="text"
       name="username" 
        placeholder='JohnDoe'
        value={Values.username}
        onChange={change}
         className='bg-gray-200 text-zinc-900 outline-none p-2 w-full rounded mt-4 '  />
    </div>
    <div className='secondterm mt-2'>
      <label htmlFor="email">Email</label>
      <input type="email" name="email"  value={Values.email}
        onChange={change} placeholder='joe@gmail.com' className='bg-gray-200 text-zinc-900 outline-none p-2 w-full rounded mt-4'  />
    </div>
    <div className='thirdterm mt-2'>
      <label htmlFor="password">Password</label>
      <input type="password" name='password'  value={Values.password}
        onChange={change} placeholder='Password' className='bg-gray-200 text-zinc-900 outline-none p-2 w-full rounded mt-4'  />
    </div>
    <div className='Fourthterm mt-2'>
      <label htmlFor="Address">Address</label>
      <input type="Address" name='address'
       value={Values.address}
       onChange={change}
        placeholder='Address' className='bg-gray-200 text-zinc-900 outline-none p-2  w-full rounded mt-4' />

       <div className='mt-8 '>
        <button className=  'bg-blue-500 hover:bg-blue-900 px-4 py-3 rounded w-full text-center font-semibold text-white' onClick={submit}>SignUp
        </button>
       </div>
       <h3 className='w-full text-center mt-5'>Or</h3>
       <div className='w-full mt-4 flex items-center justify-center gap-1'>
      <p>Already have an account?</p>
      <Link to="/Login" className='text-blue-600 hover:text-blue-500 font-semibold underline'>Login</Link>
     
       </div>
    </div>



      </div>



    </div>
  )
}

export default Signup