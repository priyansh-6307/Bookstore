require("dotenv").config()
const cors=require("cors")
const express = require('express')
const app=express()
const path = require("path")
require("./connection/connection")
const favourite=require("./router/favourite")
const User=require("./router/user")

const book=require("./router/book")
const cart=require("./router/cart")
const Order=require("./router/order")

app.use(cors())
app.use(express.json())


app.use("/api/v1",User)
app.use("/api/v1",book)
app.use("/api/v1",favourite)
 app.use("/api/v1",cart)
app.use("/api/v1",Order)

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`)
}) 
