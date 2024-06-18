
import Supplier from "../modules/supplierModule.js"
import { supplierValidation } from "../utilities/validation.js"
import Trip from "../modules/tripModule.js"
import Client from "../modules/clientModule.js"
import { deleteClientsInSupplier, updateTripWeight } from "../utilities/updateWeight.js"
import { errorHandler } from "../utilities/internalErrorHandler.js"

export const createSupplier = async(req,res,next)=>{

    try{
        
        const tripExist = await Trip.findById(req.body.tripRef)
        if(!tripExist) return next(errorHandler(400,"trip with provided tripRef not found"))

        const supplierData = {date:tripExist.date,name:req.body.name,tripRef:req.body.tripRef}

        // verifying supplier req.body to ensure we are passing the right data to our database.
        const {error} = supplierValidation(supplierData)
        if(error) return next(errorHandler(400,error.details[0].message))
            
        const supplier = await Supplier.create(supplierData)
        if(!supplier) return next(errorHandler(400,"creating supplier failed"))

        res.status(200).json(supplier)

    }catch(error)
    {

        next(error)
    }
}

export const deleteSupplier = async(req,res,next)=>{

    try{
        // deleting suppliers in trip
        await deleteClientsInSupplier(req.params.id)
        
        const deleteSupplier = await Supplier.findByIdAndDelete(req.params.id)
        if(!deleteSupplier) return next(errorHandler(400,"error deleting supplier"))

        //update trip weight
        const updateTripweight  = updateTripWeight(supplierExist.tripRef)
        if(!updateTripweight) return next(errorHandler(400,"updating trip weight failed"))
        
        res.status(200).json({"status":"sucess deleting supplier"})
    
    }catch(error)
    {
        next(error)
    }
}

export const getSuppliers = async(req,res,next)=>{

   try{ 
        const suppliers = await Supplier.find().sort({createdAt:-1}).limit(13)
        if(!suppliers) return next(errorHandler(400,"fetching suppliers failed"))

        res.status(200).json(suppliers)

    }catch(error){

        next(error)
    }
}

export const getSupplier = async(req,res)=>{

    try{
        const supplier = await Supplier.findById(req.params.id)
        if(!supplier) return next(errorHandler(400,"suppliers with provided id found"))

        const clients = await Client.find({supplierRef:req.params.id})
        if(!clients) return next(errorHandler(400,"failed fetching clients with provived supplierRef"))

        const supplierData = {}

        res.status(200).json({...supplierData,supplier,clients})
    
    }catch(error){

        next(error)
    }
}

export const updateSupplier = async(req,res,next)=>{

    try{
        // verifying supplier req.body to ensure we are passing the right data to our database.
        const {error} = supplierValidation(req.body)
        if(error) return next(errorHandler(400,error.details[0].message))

        const tripExist = await Trip.findById(req.body.tripRef)
        if(!tripExist) return next(errorHandler(400,"failed fetching trip with provived tripRef"))

        const supplier = await Supplier.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!supplier) return next(errorHandler(400,"failed fetching updatind supplier"))

        res.status(200).json(supplier)

    }catch(error){

        next(error)
    }
}