import Trip from "../modules/tripModule.js"
import { tripValidation } from "../utilities/validation.js"
import { deleteSuppliersInTrip } from "../utilities/updateWeight.js"
import Supplier from "../modules/supplierModule.js"
import Expense from "../modules/expense.js"
import { errorHandler } from "../utilities/internalErrorHandler.js"

export const createTrip = async(req,res,next)=>{
    
    try{
        const tripData = {name:req.body.name,date:new Date(req.body.date),trip_payment:req.body.trip_payment}

        // verifying trip req.body to ensure we are passing the right data to our database.
        const {error} = tripValidation(tripData)
        if(error) return next(errorHandler(400,error.details[0].message))

        const trip = await Trip.create(tripData)
        if(!trip) return next(errorHandler(400,"creating trip failed"))

        res.status(200).json(trip)
    }catch(error)
    {
        next(error)
    }
}

export const getTrips = async(req,res,next)=>{

    try{
        const trips = await Trip.find().sort({createdAt:-1}).limit(13)
        if(!trips) return next(errorHandler(400,"fetching trips failed"))

        res.status(200).json(trips)
    }catch(error){

        next(error)
    }
}

export const getTrip = async(req,res,next)=>{

    try{
        const trip = await Trip.findById(req.params.id)
        if(!trip) return next(errorHandler(400,"trip with provived id does not exist"))

        const suppliers = await Supplier.find({tripRef:req.params.id})
        if(!suppliers) return next(errorHandler(400,"trip with provived tripRef is not found"))

        const expense = await Expense.find({tripRef:req.params.id})
        if(!expense) return next(errorHandler(400,"trip with id is not found"))

        const tripData = {}

        res.status(200).json({...tripData,trip,suppliers,expense})

    }catch(error){

        next(error)
    }
}

export const updateTrip = async(req,res,next)=>{

    try{
        // verifying trip req.body to ensure we are passing the right data to our database.
        const {error} = tripValidation(req.body)
        if(error) return res.status(400).json(error.details[0].message)

        const updatedTrip = await Trip.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!updatedTrip) return res.status(400).json({"status":"updating trip failed!, trip with id does not exist"})

        res.status(200).json(updatedTrip)

    }catch(error)
    {
        next(error)
    }
}

export const deleteTrip = async(req,res,next)=>{

    try{
        // deleting suppliers in trip
        await deleteSuppliersInTrip(req.params.id)

        const deleteTrip = await Trip.findByIdAndDelete(req.params.id)
        if(!deleteTrip) return next(errorHandler(400,"deleting trip failed!"))

        res.status(200).json({"message":"trip deleted successfully"})

    }catch(error){

        next(error)
    }
}

export const findTripsByDate = async(req,res,next)=>{
    
    try{
        const trips = await Trip.aggregate([{
        $project:{name:1,weight:1,date:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}}])

        if(!trips) return next(errorHandler(400,"failed to get trips"))

        res.status(200).json(trips)

    }catch(error){

        next(error)
    }
}