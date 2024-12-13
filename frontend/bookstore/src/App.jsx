import React, { useEffect } from "react"
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import './index.css';
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import Allbooks from "./pages/allbooks";
import Signup from "./pages/Signup";
import Cart from "./pages/cart";
import Profile from "./pages/Profile";
import View from "./components/viewbookdetails/View";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserHistory from "./components/Profile/UserHistory";
import Settings from "./components/Profile/Settings";

function App() {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("id")&&
        localStorage.getItem("token")&&
        localStorage.getItem("role")  
  ){
    dispatch(authActions.login())
    dispatch(authActions.changeRole(localStorage.getItem("role")))
  }
  })
  return (
    <>
    
    <Navbar />
    <Routes>
      <Route exact path="/"element={<Home/>} />
      <Route exact path="/all-books" element={<Allbooks/>}/>
      <Route exact path="/Signup" element={<Signup/>} />
      <Route exact path="/Login" element={<Login/>} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/profile" element={<Profile />} >
      <Route index element={<Favourites/>}/>
      <Route path="/profile/orderHistory"element={<UserHistory/>}/>
      <Route path="/profile/settings"element={<Settings/>}/>
      </Route>
      <Route exact path="/view-Book-details/:id" element={<View />}/>
    </Routes>
    <Footer />
 
      
    </>
  );
}

export default App;


