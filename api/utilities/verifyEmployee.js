import Jwt  from "jsonwebtoken";
import { errorHandler } from "./internalErrorHandler.js";

export const verifyToken = (req,res,next)=>{

    const token = req.cookies.access_token;
    // console.log(token)

    if(!token) return next(errorHandler(401,'un authorised'))

    const user = Jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{

        if(error){

            return 'token expiered'

        }else{

            return user

        }
        
    });

    console.log(user)

    if(user=='token expiered') return next(errorHandler(403,"token expired"))

    req.user = user
    next()
}