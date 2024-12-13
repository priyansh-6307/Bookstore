const router=require("express").Router()
const User=require("../models/user")
const authenticateToken=require("./userauth")



router.put("/add-to-cart",authenticateToken, async(req,res)=>{

try {

    const { bookid, id } = req.body;
    const userData= await User.findById(id)
    if(!userData){
        res.status(500).json({message:"No User found"})
    }

    const iscart= userData.cart.includes(bookid)

    if(iscart){
        return res.status(400).json({message:"Book already in the cart"})
    }

    await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
    return res.status(200).json({message:"Book Succesfully Added in the Cart"})
    
} catch (err) {
    console.log(err)
    res.status(500).json({message:"Internal server error"})
    
}


})

router.put("/remove-from-cart",authenticateToken, async(req,res)=>{

    try {
        const {id,bookid}=req.body;
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}})
        res.status(200).json({message:"Book removed from cart"})
        
    } catch (err) {
        res.status(500).json({message:"Internal server error" })
    }
   



})

router.get("/all-books-of-cart",authenticateToken,async(req,res)=>{

    try {
        const{id}=req.headers
        const userData= await User.findById(id).populate("cart")
    
        const allbooks=userData.cart
    
        return res.status(200).json({message:"Books",data:allbooks})
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({message:"internal server error"})
        
    }

})


module.exports=router