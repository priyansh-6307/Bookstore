require("dotenv").config()

const express = require('express')
const app=express()
const path = require("path")
require("./connection/connection")
const User=require("./router/user")

const book=require("./router/book")


app.use(express.json())

app.use("/api/v1",User)
app.use("/api/v1",book)
 
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`)
}) 
