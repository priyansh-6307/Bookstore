const router=require("express").Router()
const authenticateToken=require("./userauth")
const Book=require("../models/book")
const Order=require("../models/order")
const User=require("../models/user")



router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { order, id } = req.body;
        
        
        const orderDataIds = [];  

        for (const orderdata of order) {
            const newOrder = new Order({
                user: id,
                book: orderdata._id
            });

            const orderDataFromDb = await newOrder.save();
            orderDataIds.push(orderDataFromDb._id);
            
        
            await User.findByIdAndUpdate(id, {
                $push: { order: orderDataFromDb._id }
            });
        }

        
        await User.findByIdAndUpdate(id, {
            $pull: { cart: { $in: order.map(item => item._id) } } 
        });

        return res.json({ message: "Order placed successfully" });
        
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Internal server error" });
    }
});


router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData= await User.findById(id).populate({path:'order',populate:{path:'book'}})
        const ordersData= userData.order.reverse(); 

        console.log(userData)
            return res.json({
                data:ordersData
            })


    } catch (err) {
        console.log(err)
        return res.status(500).json({Message:"Internal Server Error"})
    }
})



router.get("/get-all-history",authenticateToken,async(req,res)=>{
    try {
        const userData= await Order.find().populate({path:"book",select: "_id title desc price"}).populate({path:"user"}).sort({createdAt:-1})
              
        return res.json({Data:userData})
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({Message:"Internal Server Error"})
    }
})


router.put("/update-status/:id", authenticateToken,async(req,res)=>{

        const {id}=req.params
        await Order.findByIdAndUpdate(id,{status:req.body.status})

            return res.status(200).json({
                Status:"success",
                Message:"Status updated succesfully"
            })

})



module.exports=router 