const mongose=require('mongoose')

const user= new mongose.Schema({
    username:{
        type:String,
        required:true
},
address:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
avatar:{
    type:String
},
role:{
    type:String,
    default:"user",
    enum:["user","admin"]
},
favourites:[{type:mongose.Types.ObjectId,
    ref:"books"
}],
cart:[{type:mongose.Types.ObjectId,
    ref:"books"
}],
order:[{type:mongose.Types.ObjectId,
    ref:"order"
}],

},{timestamps:true})

module.exports=mongose.model("user",user)