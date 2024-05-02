const User = require("../models/user")

const getData = async(req,res)=>{
    try{
        const users = await User.find({});
        return res.status(200).json({users:users})

    }catch(e){
        console.log(e)
        return res.status(500).json({message:"Internal server error",error: e.message})
    }


}

exports.getData = getData