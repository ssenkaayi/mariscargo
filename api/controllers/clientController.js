
import Client from '../modules/clientModule.js'
import Supplier from '../modules/supplierModule.js'
import {clientValidation} from '../utilities/validation.js'
import { updateSupplierWeight} from '../utilities/updateWeight.js'
import { isValidObjectId } from "mongoose";
import { Delivery } from '../modules/deliveryModule.js';
import { Payment } from '../modules/paymentModule.js';
import { errorHandler } from '../utilities/internalErrorHandler.js';

export const createClient = async(req,res,next)=>{

    try{    
        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = clientValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))
        // if(error) return res.status(400).json({"message":error.details[0].message})

        const isValidId = isValidObjectId(req.body.supplierRef)
        if(!isValidId) return next(errorHandler(400,"not valid id"))

        const supplierExist = await Supplier.findById(req.body.supplierRef)
        if(!supplierExist) return res.status(400).json({"message":"supplier with supplierRef doesnt exist"})

        const clientData = {date:supplierExist.date,weight:req.body.weight,name:req.body.name,supplierRef:req.body.supplierRef,phone:req.body.phone}

        // registering new client
        const client = await Client.create(clientData)
        if(!client) return next(errorHandler(400,'creating client failed'))

        //update supplier and trip weight
        const updateWeight = updateSupplierWeight(client.supplierRef)
        if(!updateWeight) return next(errorHandler(400,"updating supplier weight failed"))

        res.status(200).json(client)
    }
    catch(error){

        next(error)
    
    }
}

export const getClients = async(req,res,next)=>{

    try{    
        const clients = await Client.find().sort({createdAt:-1}).limit(13)
        if(!clients) return next(errorHandler(404,"fetching all clients"))

        res.status(200).json(clients)

    }catch(error){
        next(error)
    }
}

export const updateClient = async(req,res)=>{

    try{
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"provided invalid params id"))

        const {error} = clientValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const supplierExist = await Supplier.findById(req.body.supplierRef)
        if(!supplierExist) return next(errorHandler(400,"supplier with provived supplierRef does not exist"))

        const updateClient = await Client.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!updateClient) return next(errorHandler(400,"client does not exist"))

        // update supplier and trip weight
        const updateWeight = updateSupplierWeight(req.body.supplierRef)
        if(!updateWeight) return next(errorHandler(400,"updating weight failed"))

        res.status(200).json(updateClient)

    }catch(error){

        next(error)
    }
}

export const getClient = async(req,res)=>{

    try{
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"provived an invalid id"))

        const getClient = await Client.findById(req.params.id)
        if(!getClient) return next(errorHandler(400,"client with id not foung"))

        const deliveries = await Delivery.find({clientRef:req.params.id})
        if(!deliveries) return next(errorHandler(400,"no deliveries with provided clientRef found"))

        const payments = await Payment.find({clientRef:req.params.id})
        if(!deliveries) return next(errorHandler(400,"no payments with provided clientRef found"))

        const clientData = {}

        res.status(200).json({...clientData,getClient,deliveries,payments})
    }
    catch(error){
        next(error)
    }

   
}

export const deleteClient = async(req,res)=>{

    try{ 
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"provived an invalid id"))

        const client = await Client.findById(req.params.id)
        if(!client) return next(errorHandler(400,"client with id not foung"))

        const supplier = await Supplier.findById(client.supplierRef)
        if(!supplier) return rnext(errorHandler(400,"no supplier with provided supplierRef found"))

        const deleteClient = await Client.findByIdAndDelete(req.params.id)
        if(!deleteClient) return next(errorHandler(400,"failed to delete client"))

        //update supplier and trip weight
        const updateWeight = updateSupplierWeight(client.supplierRef)
        if(!updateWeight) return next(errorHandler(400,"failed to update supplier weight"))

        res.status(200).json({"status":"client deleted successfully"})
    } catch(error){

        next(error)
    }
}


