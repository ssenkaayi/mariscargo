
import Supplier from "../modules/supplierModule.js"
import { supplierValidation } from "../utilities/validation.js"
import Trip from "../modules/tripModule.js"
import Client from "../modules/clientModule.js"
import { deleteClientsInSupplier, updateSupplierName, updateTripWeight } from "../utilities/updateWeight.js"
import { errorHandler } from "../utilities/internalErrorHandler.js"

export const createSupplier = async(req,res,next)=>{

    try{
        
        const tripExist = await Trip.findById(req.body.tripRef)
        if(!tripExist) return next(errorHandler(400,"trip with provided tripRef not found"))

        const supplierData = {date:tripExist.date,name:req.body.name,tripRef:req.body.tripRef,tripName:tripExist.name}
     
        // verifying supplier req.body to ensure we are passing the right data to our database.
        const {error} = supplierValidation(supplierData)
        if(error) return next(errorHandler(400,error.details[0].message))
            
        const supplier = await Supplier.create(supplierData)
        if(!supplier) return next(errorHandler(400,"creating supplier failed"))
        // console.log(supplier)

        res.status(200).json(supplier)

    }catch(error)
    {

        next(error)
    }
}

export const deleteSupplier = async(req,res,next)=>{

    try{
      
        const supplierExist = await Supplier.findById(req.params.id)
        if(!supplierExist) return next(errorHandler(400,"supplier with given id does not exist"))

        // deleting clients in supplier with the supplier id
        const deleteClients = await deleteClientsInSupplier(req.params.id)
        // if(!deleteClients) return next(errorHandler(400,"error deleting clients with supplierRef"))
        
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

    try{console.log(req.body)
        const {name,tripRef,tripName,date} = req.body

        // verifying supplier req.body to ensure we are passing the right data to our database.
        const {error} = supplierValidation({name,tripRef,tripName,date})
        if(error) return next(errorHandler(400,error.details[0].message))

        const tripExist = await Trip.findById(req.body.tripRef)
        if(!tripExist) return next(errorHandler(400,"failed fetching trip with provived tripRef"))

        const supplier = await Supplier.findByIdAndUpdate({_id:req.params.id},{$set:{name}},{new:true})
        if(!supplier) return next(errorHandler(400,"failed fetching updatind supplier"))

        res.status(200).json(supplier)

    }catch(error){

        next(error)
    }
}

export const supplierReport = async(req,res,next)=>{
    
    try{

        // console.log(req.body)
        let totalWeight  = 0
        // let totalExpense = 0
        // let totalTrip_Payment = 0
   
        const suppliers = await Supplier.aggregate([{
        $project:{name:1,weight:1,date:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}}, 
        ])

        const supplierGroups = await Supplier.aggregate([{
        $project:{name:1,weight:1,date:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}},  {
            $group: {
                _id: "$name",
                count: { $count: { } },
                weight:{$sum:"$weight"}
            }
        }])

        if(!suppliers) return next(errorHandler(400,"failed to get supplier"))

        const number = suppliers.length

        if(suppliers.length>0){

            for (let supplier = 0; supplier<suppliers.length;supplier++ ){

                totalWeight  += suppliers[supplier].weight
                // totalExpense += trips[supplier].expense
                // totalTrip_Payment += suppliers[trip].trip_payment
                   
            }
    
        }else{
    
            totalWeight = 0
    
        }

        const report = {}

        res.status(200).json({...report,suppliers,totalWeight,number,supplierGroups})

    }catch(error){

        next(error)
    }
}