import { Payment } from "../modules/paymentModule.js";
import Client from "../modules/clientModule.js";
import { paymentValidation } from "../utilities/validation.js";
import { isValidObjectId } from "mongoose";
import { updatePayments } from "../utilities/updateWeight.js";
import { errorHandler } from "../utilities/internalErrorHandler.js";

export const createPayment = async(req,res,next)=>{

    try{
        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = paymentValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const isValidId = isValidObjectId(req.body.clientRef)
        if(!isValidId) return next(errorHandler(400,"invalid clientRef"))

        const clientExist = await Client.findById(req.body.clientRef)
        if(!clientExist) return res.status(400,"client with clientRef does not exist")
        
        const payment = await Payment.create({...req.body,name:clientExist.name})
        if(!payment) return next(errorHandler(400,"failed creating new payment"))

        await updatePayments(req.body.clientRef)

        res.status(200).json({"message":"payment created successfully"})
    
    }catch(error){
        next(error)
    }
}

export const getPayments = async(req,res,next)=>{
     
    try{
        const payments = await Payment.find().sort({createdAt:-1}).limit(13)
        if(!payments) return next(errorHandler(400,"feteching payments failed"))

        res.status(200).json(payments)

    }catch(error){
        next(error)
    }
}

export const getPayment = async(req,res,next)=>{

    try{
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"invalid payment id"))
        
        const payment = await Payment.findById(req.params.id)
        if(!payment) return next(errorHandler(400,"fetching payment failed "))

        res.status(200).json(payment)
    
    }catch(error){

        next(error)
    }
}

export const updatePayment = async(req,res,next)=>{

    try{
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"invalid id"))

        const {error} = paymentValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const clientExist = await Client.findById(req.body.clientRef)
        if(!clientExist) return next(errorHandler(400,"client with clientRef does not exist"))

        const updatedPayment = await Payment.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!updatedPayment) return next(errorHandler(400,"failed to update payment"))

        await updatePayments(req.body.clientRef)
    
        res.status(200).json(updatedPayment)

    }catch(error){
        next(error)
    }
}

export const deletePayment = async(req,res,next)=>{

    try{
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"invalid id"))

        const paymentExist = await Payment.findById(req.params.id)
        if(!paymentExist) return next(errorHandler(400,"payment does not exist"))

        const deletePayment = await Payment.findByIdAndDelete({_id:req.params.id},req.body,{new:true})
        if(!deletePayment) return next(errorHandler(400,"failed to update payment"))

        await updatePayments(paymentExist.clientRef)

        res.status(200).json({"status":"payment deleted sucessfully"})
    
    }catch(error){

        next(error)
    }

}
