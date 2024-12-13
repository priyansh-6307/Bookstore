const router=require("express").Router()
const User=require("../models/user")
const {authenticateToken}=require("./userauth")

router.put("/add-book-to-favourite",authenticateToken, async (req,res) =>{
try {
    const {id, bookid}=req.headers
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
})

module.exports=router 