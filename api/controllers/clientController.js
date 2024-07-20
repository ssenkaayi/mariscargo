
import Client from '../modules/clientModule.js'
import Supplier from '../modules/supplierModule.js'
import Trip from '../modules/tripModule.js'
import {clientValidation,editClientValidation} from '../utilities/validation.js'
import { deleteDeliveriesInClient, deletePaymentsInClient, updateSupplierWeight} from '../utilities/updateWeight.js'
import { isValidObjectId } from "mongoose";
import { Delivery } from '../modules/deliveryModule.js';
import { Payment } from '../modules/paymentModule.js';
import { errorHandler } from '../utilities/internalErrorHandler.js';

export const createClient = async(req,res,next)=>{
    // console.log(req.body)

    try{    
        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = clientValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))
   
        const isValidId = isValidObjectId(req.body.supplierRef)
        if(!isValidId) return next(errorHandler(400,"not valid id"))

        const supplierExist = await Supplier.findById(req.body.supplierRef)
        if(!supplierExist) return res.status(400).json({"message":"supplier with supplierRef doesnt exist"})

        const clientData = {date:supplierExist.date,weight:req.body.weight,name:req.body.name,supplierRef:req.body.supplierRef,phone:req.body.phone,no_pieces:req.body.no_pieces}

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

export const updateClient = async(req,res,next)=>{

    try{
        const{name,weight,no_pieces,phone,supplierRef} = req.body

        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"provided invalid params id"))
        // console.log(req.body)
        const {error} = clientValidation({name,weight,no_pieces,phone,supplierRef})
        if(error) return next(errorHandler(400,error.details[0].message))
        // console.log(req.body)

        const supplierExist = await Supplier.findById(req.body.supplierRef)
        if(!supplierExist) return next(errorHandler(400,"supplier with provived supplierRef does not exist"))
            
        const updateClient = await Client.findByIdAndUpdate({_id:req.params.id},{$set:{name,weight,no_pieces,phone}},{new:true})
        if(!updateClient) return next(errorHandler(400,"client does not exist"))

        // console.log(updateClient)

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

export const deleteClient = async(req,res,next)=>{

    try{ 
        const isValidId = isValidObjectId(req.params.id)
        if(!isValidId) return next(errorHandler(400,"provived an invalid id"))

        const client = await Client.findById(req.params.id)
        if(!client) return next(errorHandler(400,"client with id not foung"))
    

        const deleteDeliveries = await deleteDeliveriesInClient(req.params.id)
        // if(!deleteDeliveries) return next(errorHandler(400,'deleting deliveries with clientRef failed'))

        const deletePayments = await deletePaymentsInClient(req.params.id)
        // if(!deletePayments) return next(errorHandler(400,'deleting payments with clientRef failed'))

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

export const clientReport = async(req,res,next)=>{
    
    try{

        // console.log(req.body)
        let totalWeight  = 0
        let totalDeliveries = 0
        let totalPayments = 0
   
        const clients = await Client.aggregate([{
        $project:{name:1,weight:1,deliveries:1,payments:1,date:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}}, 
        ])

        if(!clients) return next(errorHandler(400,"failed to get supplier"))

        const number = clients.length

        if(clients.length>0){

            for (let client = 0; client < clients.length;client++ ){

                totalWeight  += clients[client].weight
                totalDeliveries += clients[client].deliveries
                totalPayments += clients[client].payments
                   
            }
    
        }else{
    
            totalWeight = 0
    
        }

        const report = {}

        res.status(200).json({...report,clients,totalWeight,number,totalDeliveries,totalPayments})

    }catch(error){

        next(error)
    }
}




