import Client from "../modules/clientModule.js";
import { Delivery } from "../modules/deliveryModule.js";
import { errorHandler } from "../utilities/internalErrorHandler.js";
import { updateDeliveryWeight } from "../utilities/updateWeight.js";
import { deliveryValidation } from "../utilities/validation.js";

export const createDelivery = async(req,res,next)=>{

    try{
        // console.log(req.body)
        const client = await Client.findById(req.body.clientRef)
        if(!client) return next(errorHandler(400,"client with clientRef does not exist"))
        // console.log(client)
        
        const delivery = {...req.body,name:client.name}
        
        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = deliveryValidation(delivery)
        if(error) return next(errorHandler(400,error.details[0].message))

        await updateDeliveryWeight(delivery.clientRef)
        
        const totalWeightDelivered = parseInt(client.deliveries) + parseInt(delivery.weight)
        console.log(totalWeightDelivered)
        if(client.weight<totalWeightDelivered) return next(errorHandler(400,`cannot deliver more than  ${client.weight} kgs`))

        const newDelivery = await Delivery.create(delivery)
        if(!newDelivery) return next(errorHandler(400,"delivery failed"))

        await updateDeliveryWeight(req.body.clientRef)

        res.status(200).json(newDelivery)
    
    } catch(error){

        next(error)
    }
}

export const updateDelivery = async(req,res,next)=>{

    try{
        const{weight,no_pieces,deliverer,name,clientRef,date} = req.body
        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = deliveryValidation({weight,no_pieces,deliverer,name,clientRef,date})
        if(error) return next(errorHandler(400,error.details[0].message))

        const delivery = await Delivery.findById(req.params.id)
        if(!delivery) return next(errorHandler(400," delivery with id not found"))

        const client = await  Client.findById(req.body.clientRef)
        if(!client) return next(errorHandler(400,"client with id not available"))

        await updateDeliveryWeight(delivery.clientRef)

        const oldTotalDelivery = client.deliveries - delivery.weight

        const newTotalDelivery = oldTotalDelivery + req.body.weight

        if(newTotalDelivery>client.weight) return next(errorHandler(400,`weight delivered cannot execeed available ${client.weight} weight`))

        const updatedDelivery = await Delivery.findByIdAndUpdate({_id:req.params.id},{$set:{weight,no_pieces,deliverer}},{new:true})
        if(!updateDelivery) return next(errorHandler(400,"failed to update delivery"))

        await updateDeliveryWeight(delivery.clientRef)

        res.status(200).json(updatedDelivery)

    }catch(error){
        next(error)
    }
}

export const getDeliveries = async(req,res,next)=>{

    try{
        const deliveries = await Delivery.find().sort({createdAt:-1})   //.limit(13)
        if(!deliveries) return next(errorHandler(400,"no deliveries available"))

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalDeliveries = deliveries.length
        results.pageCount = Math.ceil(deliveries.length/limit)

        if(lastIndex < deliveries.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = deliveries.slice(startIndex,lastIndex)

        res.status(200).json(results)

    }catch(error){
        next(error)
    }
}

export const getDelivery = async(req,res,next)=>{

   try{ 
        const delivery = await Delivery.findById(req.params.id)
        if(!delivery) return next(errorHandler(400,"no deliveries available"))

        res.status(200).json(delivery)

    }catch(error){

        next(error)
    }
}

export const deleteDelivery = async(req,res,next)=>{

    try{
        const deliveryExist = await Delivery.findById(req.params.id)
        if(!deliveryExist) return next(errorHandler(400,"delivery does not exist"))

        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id)
        if(!deletedDelivery) return next(errorHandler(400,"failed deleting delivery"))

        await updateDeliveryWeight(deliveryExist.clientRef)
        // if(!updateWeightDelivered) return res.status(400).json({"status":"failed updating delivery weighy"})

        res.status(200).json({"message":"delivery deleted successfully"})
    
    }catch(error){

        next(error)
    }
}