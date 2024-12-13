const moongose=require("mongoose")

const conn = async()=>{
    try{
        moongose.connect(process.env.uri)
        console.log("Mongodb Connected")
    }
    catch(err){
        console.log("Error 404",err)
    }
}

conn()