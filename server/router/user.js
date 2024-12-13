const router= require("express").Router()
const bcrypt= require('bcryptjs')
const path=require('path')
const User=require("../models/user")
const jwt = require("jsonwebtoken")
const authenticateToken=require("./userauth")

router.post("/sign-up",async (req,res)=>{
    try {
     const {username,password,address,email}=req.body

     if(username.length<=4){
      return res.status(404).json({Message:"Username should be greater than 4"})
     }

     const existinguser=await User.findOne({username:username})

     if(existinguser){
       return res.status(403).json({message:"Username already exist "})
     }
       
     const existingemail=await User.findOne({email:email})
     if(existingemail){
       return res.status(403).json({message:"Email already registered"})
     }


const hashedpassword= await bcrypt.hash(password,10)

const newuser= new User({
    username:username,
    email:email,
    password:hashedpassword,
    address:address
})

await newuser.save()
return res.status(200).json({message:"User registered succesfully"})


} catch(error) {
        console.log("error",error)
        return res.status(400).json({Message :"Server error"})
    }
})


router.post("/sign-in",async (req,res)=>{
    try {
        const {username,password}=req.body
        const existingUser=await User.findOne({username})
        if(!existingUser){
            res.status(400).json({message:"Invalid credintials"})
        }
      
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){

            const authClaims=[
                {name:existingUser.username},
                {role:existingUser.role}
            ]
            const token =jwt.sign({authClaims},"bookStore123",{expiresIn:"30d"})
           return res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})
        }
        else{
            console.log(err)
           return res.status(400).json({message:"invalid credentials"})
        }
       })






} catch(error) {
        console.log("error",error)
        return res.status(400).json({Message :"Server error"})
    }
})

router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data)
        
    } catch (err) {
        return res.status(400).json({Message :"Server error"})
    }
})


router.put("/update-adddress",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address})

        return res.status(200).json({message:"upadtaed"})

    } catch (error) {
        return res.status(400).json({Message :"Server error"})
    }
})

module.exports=router;



/*    const{username,email,address,password}=req.body

           
if(username.length<5){
    return res.status(400).json({message:"Username should be more than 4 words"})
 }

 const existingUser= await User.findOne({username:username})
 if(existingUser){
    return res.status(400).json({Message:"User already registered"})
 }
 
 const existingemail= await User.findOne({email:email})
 if(existingemail){
     return res.status(400).json({Message:"Email already registered"})



     const hashedPassword = await bcrypt.hash(password, 10);

        const newUser= new User({
            username:username,
            email:email,
            password:hashedPassword,
            address:address
        })


       await newUser.save()
          return res.status(200).json({ message: "User registered successfully"});
 }*/