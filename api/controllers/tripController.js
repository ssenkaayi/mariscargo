import Trip from "../modules/tripModule.js"
import { tripValidation } from "../utilities/validation.js"
import { deleteExpenseInTrip, deleteSuppliersInTrip ,updateSupplierName} from "../utilities/updateWeight.js"
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
        const trips = await Trip.find().sort({createdAt:-1})   //.limit(13)
        if(!trips) return next(errorHandler(400,"fetching trips failed"))

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalTrips = trips.length
        results.pageCount = Math.ceil(trips.length/limit)

        if(lastIndex < trips.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = trips.slice(startIndex,lastIndex)


        res.status(200).json(results)

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
        // console.log(req.body)

        const {_id,name,trip_payment,date} =req.body
        // verifying trip req.body to ensure we are passing the right data to our database.
        const {error} = tripValidation({name,trip_payment,date})
        if(error) return next(errorHandler(400,error.details[0].message))

        const updatedTrip = await Trip.findByIdAndUpdate({_id:req.params.id},{$set:{name,trip_payment,date}},{new:true})
        if(!updatedTrip) return next(errorHandler(400,"updating trip failed!"))

        await updateSupplierName(_id,name,date)

        res.status(200).json(updatedTrip)

    }catch(error)
    {
        next(error)
    }
}

export const deleteTrip = async(req,res,next)=>{

    try{
        const deleteExpenses = await deleteExpenseInTrip(req.params.id)
        // if(!deleteExpenses) return next(errorHandler(400,"deleting expenses with tripRef failed"))

        // deleting suppliers in trip
        const deleteSuppliers = await deleteSuppliersInTrip(req.params.id)
        // if(!deleteSuppliers) return next(errorHandler(400,"deleting suppliers with tripRef failed"))

        const deleteTrip = await Trip.findByIdAndDelete(req.params.id)
        if(!deleteTrip) return next(errorHandler(400,"deleting trip failed!"))

        res.status(200).json({"message":"trip deleted successfully"})

    }catch(error){

        next(error)
    }
}

export const findTripsByDate = async(req,res,next)=>{
    
    try{

        // console.log(req.body)
        let totalWeight  = 0
        let totalExpense = 0
        let totalTrip_Payment = 0
   
        const trips = await Trip.aggregate([{
        $project:{name:1,weight:1,date:1,expense:1,trip_payment:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}}])

        if(!trips) return next(errorHandler(400,"failed to get trips"))

        const number = trips.length

        if(trips.length>0){

            for (let trip = 0; trip<trips.length;trip++ ){

                totalWeight  += trips[trip].weight
                totalExpense += trips[trip].expense
                totalTrip_Payment += trips[trip].trip_payment
                   
            }
    
        }else{
    
            totalWeight = 0
    
        }

        const report = {}

        res.status(200).json({...report,trips,totalWeight,number,totalExpense,totalTrip_Payment})

    }catch(error){

        next(error)
    }
}