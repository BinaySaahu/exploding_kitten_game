const User = require("../models/user")

const update = async(req,res)=>{
    const {email,points} = req.body;
    console.log(email,points)
    try{
        // const user= await User.findOne({email:email});

        const updated = await User.updateOne({email:email},{$set:{points: points}}, {upsert: true})
        // if(updated.matchedCount >= 1){
        return res.status(200).json({message:"Updated successfully"})
        // }
        // else {
        //     return res.status(400).json({message:"Some error we cannot update"})
        // }
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"Internal server error",error: e.message})
    }


}

exports.update = update