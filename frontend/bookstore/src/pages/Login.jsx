import {React,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import signupImage from './signup.png';
import axios from 'axios'
import {authActions} from '../store/auth'
import { useDispatch } from 'react-redux';


const Login = () => { 
  const [Values,setValues]=useState({
    username:"",
    password:""
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value})
  }

  const submit=async()=>{
    try {
      if(Values.username===''||  Values.password===''){
        alert('All fields are required')
        return
      }
      else{
        const response =await axios.post("http://localhost:6700/api/v1/sign-in",Values)
        console.log(response)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile")
      
      }
      
     
      
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  return (
    <div style={{backgroundImage: `url(${signupImage})`}} className=" flex justify-center items-center bg-cover w-full h-auto">
      <div className="bg-white px-6 py-6 rounded-lg md:w-[75%] lg:w-2/6 mt-20 mb-20">
    <p className='text-zinc-900 font-semibold text-xl w-full text-center'>Login</p>
    <div className="firstname mt-8">
      <label htmlFor="">Username</label>
      <input type="text" name="username" placeholder='JohnDoe' className='bg-gray-200 text-zinc-900 outline-none p-2 w-full rounded mt-4 ' value={Values.username} onChange={change}/>
    </div>
    
    <div className='thirdterm mt-2'>
      <label htmlFor="password">Password</label>
      <input type="password" name='password' placeholder='Password' className='bg-gray-200 text-zinc-900 outline-none p-2 w-full rounded mt-4' value={Values.password} onChange={change} />
    </div>


       <div className='mt-8 '>
        <button className='bg-blue-500 px-4 py-3 rounded w-full text-center hover:bg-blue-900 font-semibold text-white'onClick={submit}>Login
        </button>
       </div>
       <h3 className='w-full text-center mt-5'>Or</h3>
       <div className='w-full mt-4 flex items-center justify-center gap-1'>
      <p>Don't have an account?</p>
      <Link to="/SignUp" className='text-blue-600 hover:text-blue-500 font-semibold underline'>SignUp</Link>
     
       </div>
    </div>



      </div>



   
  )
}


export default Login