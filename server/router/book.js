const router= require("express").Router()
const User=require("../models/user")
const jwt = require("jsonwebtoken")
const authenticateToken=require("./userauth")
const Book =require("../models/book")
const book = require("../models/book")


router.post("/add-book",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
         const user= await User.findById(id);

         if(user.role!=="admin"){
            res.status(200).json({message:"You don't have te acces to add the book"})
         }



        const book= new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        })
        await book.save()
        res.status(200).json({message:"book added succesfully"})
    } catch (err) {
        return res.status(400).json({Message:"internal server error"})
    }
})

router.put("/update-book",authenticateToken, async(req,res)=>{
    
   try {
    const {bookid}=req.headers
    await Book.findByIdAndUpdate(bookid,{
        url:req.body.url,
        title:req.body.title,
        language:req.body.language,
        price:req.body.price,
        desc:req.body.desc,
        author:req.body.author
    })

    res.status(200).json({Message:"Book updated succesfully"})
   } catch (err) {
    res.status(401).json({Message:"404 error"})
   }
})


router.delete("/delete-book",authenticateToken,async(req,res)=>{  
    try {
        const {bookid}=req.headers
        await Book.findByIdAndDelete(bookid)

        res.status(200).json({message:"Book deleted Succesfully"})
        
    } catch (err) {
        res.status(402).json({message:"an error occcured"})
        
    }
 
})

router.get("/get-allbooks",authenticateToken, async(req,res)=>{
    try {
      const books= await Book.find().sort({createdAt:-1});
        res.status(200).json({Message:"book fetched succesfully",books
        })
        
    } catch (err) {
        console.log(err)
        res.status(400).json({Message:"An error has occured"})
    }
})
router.get("/get-recent- books"  , async(req,res)=>{
    try {
      const books= await Book.find().sort({createdAt:-1}).limit(4);
        res.status(200).json({Message:"book fetched succesfully",books
        })
        
    } catch (err) {
        console.log(err)
        res.status(400).json({Message:"An error has occured"})
    }
})

router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
    const {id}=req.params
    const book=await Book.findById(id)
    res.status(200).json({Message:"Success",book})

}
    catch (err){
        res.status(404).json({message:"An error has occured"})
    }
})


module.exports=router