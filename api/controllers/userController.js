
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";
import {errorHandler} from '../utilities/internalErrorHandler.js';
import User from "../modules/userModule.js";
import { employeeValidation ,loginValidation} from "../utilities/validation.js";



export const registerEmploye =(async(req,res,next)=>{

    console.log(req.body)

    try{
        const {error} = employeeValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const {date,name,email,phone, role, password,address} = req.body

        const isEmploye = await User.findOne({email})
        if(isEmploye) return next(errorHandler(400,'account with email exists'))
    
        const hashedPassword = bcrypt.hashSync(password,10)
        
        const newEmploye = new User({ date,name, email, phone, role,password:hashedPassword, address})

        const saveEmploye = await newEmploye.save()
        const {password:pass,...rest} = saveEmploye._doc

        res.status(200).send(rest)
    
    }catch(error){

        next(error)
    }
   
  
})

const generateToken = (id)=>{

    // it will be expired after 120ms
    return Jwt.sign({_id:id},process.env.JWT_SECRET,{expiresIn:10})
}

export const loginEmploye = async(req,res,next)=>{
    // console.log("charles")

    try{
 
        const {error} = loginValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const {email,password} = req.body

        const isEmploye = await User.findOne({email})
        if(!isEmploye) return next(errorHandler(400,'employe dosent exist'))
    
        const isValidPassword = bcrypt.compareSync(password,isEmploye.password)
        if(!isValidPassword) return next(errorHandler(400,'incorrect email and password')) 
    
        const token = generateToken(isEmploye._id)
        const {password:pass,...rest} = isEmploye._doc
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)

      }catch(error){

        next(error)
    }

}

export const logoutEmploye = (async(req,res,next)=>{


    res.clearCookie('access_token').status(200).json("logged out succesfully")

    
})

