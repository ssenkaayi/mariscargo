import Client from "../modules/clientModule.js";
import Supplier from "../modules/supplierModule.js";
import Trip from "../modules/tripModule.js"
import { Delivery } from "../modules/deliveryModule.js";
import { Payment } from "../modules/paymentModule.js";
import Expense from "../modules/expense.js";

export const updateSupplierWeight = async(supplierRef)=>{

    const supplier = await Supplier.findById(supplierRef)
    if(!supplier) return res.status(400).json({"message":"no suppliers with id found"})

    const supplier_weight = await Client.aggregate([{ $match: {supplierRef}},
        {$group: { _id: null, weight: { $sum:"$weight" } }  }]
    )

    const updateSupplier =async(weight)=>{

        await Supplier.findByIdAndUpdate({_id:supplierRef},{$set:{weight}},{new:true})
        await updateTripWeight(supplier.tripRef)

    } 

    if(supplier_weight.length>0){

        const supplierWeightUpdate = supplier_weight[0].weight.toFixed(2)
        updateSupplier(supplierWeightUpdate)

    }else{

        const supplierWeightUpdate = 0
        updateSupplier(supplierWeightUpdate)

    }
    
}

export const updateDeliveryWeight = async(clientRef)=>{

    const deliveries = await Delivery.aggregate([{ $match: {clientRef}},
        {$group: { _id: null, weight: { $sum:"$weight" } }  }]
    )

    const updateClinetDeliverier = async(weight)=>{

        await Client.findByIdAndUpdate({_id:clientRef},{$set:{deliveries:weight}},{new:true})

    }

    if(deliveries.length>0){

        const weight = deliveries[0].weight.toFixed(2)
        updateClinetDeliverier(weight)

    }else{

        const weight = 0
        updateClinetDeliverier(weight)

    }

}

export const updatePayments = async(clientRef)=>{

    const payments = await Payment.aggregate([{ $match: {clientRef}},
        {$group: { _id: null, amount: { $sum:"$amount" } }  }]
    )

    // console.log(payments)

    const updateClinetPayments = async(amount)=>{

        await Client.findByIdAndUpdate({_id:clientRef},{$set:{payments:amount}},{new:true})

    }

    if(payments.length>0){

        const amount = payments[0].amount.toFixed(2)
        updateClinetPayments(amount)

    }else{

        const amount= 0
        updateClinetPayments(amount)

    }

}

export const updateTripWeight = async(tripRef)=>{
    

    const trip_weight = await Supplier.aggregate([{ $match: {tripRef}},
        {$group: { _id: null, weight: { $sum:"$weight" } }}]
    )
    const updatedTrip = async(weight)=>{
        
        await Trip.findByIdAndUpdate({_id:tripRef},{$set:{weight}},{new:true})
    }


    if(trip_weight.length>0){

        const tripWeightUpdate = trip_weight[0].weight.toFixed(2)
        updatedTrip(tripWeightUpdate)
        
    }else{
        
        const tripWeightUpdate = 0
        updatedTrip(tripWeightUpdate)
    }
    
}

export const updateExpenses = async(tripRef)=>{
    

    const trip_expense = await Expense.aggregate([{ $match: {tripRef}},]
    )
    console.log(trip_expense)

    const updatedTrip = async(expense)=>{
        
        await Trip.findByIdAndUpdate({_id:tripRef},{$set:{expense}},{new:true})
    }


    if(trip_expense.length>0){
        let sum = 0
        const expenses = [trip_expense[0].tax,trip_expense[0].transport,trip_expense[0].market_fees]
        expenses.forEach(expense=>{sum += expense})
        console.log(sum)
        updatedTrip(sum)
        
    }else{
        
        const sum = 0
        updatedTrip(sum)
    }
    
}

export const deleteClientsInSupplier = async(supplierRef)=>{

    const clients = await Client.find({supplierRef})
    if(!clients) return res.status(400).json(Error)
    
    for (let client = 0; client<clients.length;client++ ){
    
        const deleteClients = await Client.findByIdAndDelete(clients[client]._id)
        if(!deleteClients) return res.status(400).json({"status":"failed to delete client in supplier"})
    }
}

export const deleteSuppliersInTrip = async(tripRef)=>{

    const suppliers = await Supplier.find({tripRef})
    if(!suppliers) return resizeBy.status(400).json({"status":"failed to get suppliers with tripRef"})

    for (let supplier = 0; supplier<suppliers.length;supplier++ ){

        deleteClientsInSupplier(suppliers[supplier]._id)

        const deleteSuppliers = await Supplier.findByIdAndDelete(suppliers[supplier]._id)
        if(!deleteSuppliers) return res.status(400).json({"status":"failed to delete client in supplier"})
    }
}

