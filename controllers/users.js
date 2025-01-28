import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
// import { json } from 'body-parser';

export const signin=async(req,res)=>{
          const {email,password}=req.body;
          try {
            const existingUser=await User.findOne({email});

            if(!existingUser) return res.status(404).json({message:"user not found."});

            const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

            if(!isPasswordCorrect) return res.status(400).json({message:"invalid credentails"})


          //the data we want to store in token should be given as object
            const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{ expiresIn:'1h' }) 
                
              res.status(202).json({result:existingUser,token});

          } catch (error) {
            res.status(500).json({message:'sometging went wrong'})
          }
}

export const signup=async(req,res)=>{
          

    const {email,password,firstName,lastName,confirmPassword}=req.body;

    try {
        const existingUser=await User.findOne({email});
        console.log("password=="+password)
        console.log('confirmPassword=='+confirmPassword);

        if(existingUser) return res.status(200).json({message:"user already exists."});

        if(password!==confirmPassword)  return res.status(200).json({message:"password dont match."});

        const hashedpassword = await bcrypt.hash(password,12);

        const result=await User.create({email,password:hashedpassword,name:`${firstName} ${lastName}`});

         //the data we want to store in token should be given as object
        const token=jwt.sign({email:result.email,id:result._id},'test',{ expiresIn:'1h' }) 
        
        res.status(200).json({result,token});

    } catch (error) {
          console.log(error)
    }

}