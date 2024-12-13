const router=require("express").Router()
const User=require("../models/user")
const authenticateToken=require("./userauth")

router.put("/add-book-to-favourite",authenticateToken, async (req,res) =>{
try {
    const {id}=req.headers
    const {bookid}=req.body
    const userData=await User.findById(id)
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
    const isbookfavourite= userData.favourites.includes(bookid)

    if(isbookfavourite){
        return res.status(400).json({message:"Book already in the favourites"})
    }

    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
    return res.status(200).json({message:"Book added succesfully"})

} catch (err) {
    console.log(err)
    return res.status(500).json({message:"internal server error"})
}
});


router.put("/remove-book-from-favourite",authenticateToken,async(req,res)=>{  
    try {

       const {id, bookid}=req.headers
    const userData=await User.findById(id)
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
    const isbookfavourite= userData.favourites.includes(bookid)

    if(isbookfavourite){
        await User.findByIdAndUpdate(id,{$pull:{favourites: bookid}})
    }


   
    return res.status(200).json({message:"Book removed succesfully"})

    } catch (err) {
        res.status(500).json({message:"an error occcured"})
        
    }
 
})

router.get("/get-favourite-books",authenticateToken, async(req,res)=>{
    try {
        const {id}=req.headers;
const userData= await User.findById(id).populate("favourites")

const favouritebooks= userData.favourites

return res.status(200).json({message:"Succes",data:favouritebooks})
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({message:"Internal server errorr"})
    }


})
 

module.exports=router 