const jwt =require("jsonwebtoken")

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1];

    if(token==null){
        return res.status(401).json({Message:"Authentiction token required"}) 
    };

jwt.verify(token,"bookStore123",(err,data)=>{
    if(err){
        return res.status(403).json({message:"Token expired. login again"})
    }
    req.user=data;
    next()
})

}

    module.exports=authenticateToken