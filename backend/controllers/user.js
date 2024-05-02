const User = require("../models/user")

const registerUser = async(req,res)=>{
    const {email, name} = req.body;
    console.log("Email: "+ email + "Name: " + name)
    if(email && name){
        try{
            let user = await User.findOne({email: email} )
            if(!user){
                const newUser = new User({
                    email: email,
                    name : name,
                    points: 0
                })
                await newUser.save()
                return res.status(200).json({message:"User successfully created", userData: newUser})
            }else{
                return res.status(200).json({message:"User already exists", userData: user})
            }
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"Some internal server error"})
        }

    }

}

exports.registerUser = registerUser