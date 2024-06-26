import Client from "../modules/clientModule.js";
import Supplier from "../modules/supplierModule.js";
import Trip from "../modules/tripModule.js"
import { Delivery } from "../modules/deliveryModule.js";
import { Payment } from "../modules/paymentModule.js";
import Expense from "../modules/expense.js";
import { errorHandler } from "./internalErrorHandler.js";

export const updateSupplierWeight = async(supplierRef)=>{

    const supplier = await Supplier.findById(supplierRef)
    if(!supplier) return res.status(400).json({"message":"no suppliers with id found"})

    const supplier_weight = await Client.aggregate([{ $match: {supplierRef}},
        {$group: { _id: null, weight: { $sum:"$weight" } ,count: { $sum: 1 } }  }]
    )

    const updateSupplier =async(weight,no_clients)=>{

        await Supplier.findByIdAndUpdate({_id:supplierRef},{$set:{weight,no_clients}},{new:true})
        await updateTripWeight(supplier.tripRef)

    } 

    if(supplier_weight.length>0){

        const supplierWeightUpdate = supplier_weight[0].weight.toFixed(2)
        const no_clients = supplier_weight[0].count
        updateSupplier(supplierWeightUpdate,no_clients)

    }else{

        const supplierWeightUpdate = 0
        const no_clients = 0
        updateSupplier(supplierWeightUpdate,no_clients)

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

        deleteDeliveriesInClient(clients[client]._id)
        deletePaymentsInClient(clients[client]._id)
    
        const deleteClients = await Client.findByIdAndDelete(clients[client]._id)
        if(!deleteClients) return res.status(400).json({"status":"failed to delete client in supplier"})
    }
}

export const deleteSuppliersInTrip = async(tripRef)=>{

    const suppliers = await Supplier.find({tripRef})
    if(!suppliers) return res.status(400).json({"status":"failed to get suppliers with tripRef"})

    for (let supplier = 0; supplier<suppliers.length;supplier++ ){

        deleteClientsInSupplier(suppliers[supplier]._id)

        const deleteSuppliers = await Supplier.findByIdAndDelete(suppliers[supplier]._id)
        if(!deleteSuppliers) return res.status(400).json({"status":"failed to delete client in supplier"})
    }
}

export const deleteDeliveriesInClient = async(clientRef)=>{

    const deliveries = await Delivery.find({clientRef})
    if(!deliveries) return res.status(400).json(Error)
    // console.log(deliveries)
    
    for (let delivery = 0; delivery<deliveries.length;delivery++ ){
    
        const deleteDelivery = await Delivery.findByIdAndDelete(deliveries[delivery]._id)
        if(!deleteDelivery) return res.status(400).json({"status":"failed to delete delivery with clientRef"})
    }
    // console.log(deliveries)
}

export const deletePaymentsInClient = async(clientRef)=>{

    const payments = await Payment.find({clientRef})
    if(!payments) return res.status(400).json(Error)
    // console.log(payments)
    
    for (let payment = 0; payment<payments.length;payment++ ){
    
        const deletePayment = await Payment.findByIdAndDelete(payments[payment]._id)
        if(!deletePayment) return res.status(400).json({"status":"failed to delete payment with clientRef"})
    }
    // console.log(payments)
}

export const deleteExpenseInTrip = async(tripRef)=>{

    const expenses = await Expense.find({tripRef})
    // if(!expenses) return res.status(400).json(Error)
    // console.log(expenses)

    for (let expense = 0; expense<expenses.length;expense++ ){
    
        const deleteExpense = await Expense.findByIdAndDelete(expenses[expense]._id)
        if(!deleteExpense) return next(errorHandler(400,"failed to delete payment with clientRef"))
    }
   
}

export const updateSupplierName = async(tripRef,name,date)=>{

    const suppliers = await Supplier.find({tripRef})
    // if(!expenses) return res.status(400).json(Error)

    for (let supplier = 0; supplier<suppliers.length;supplier++ ){

        updateClientDate(suppliers[supplier]._id,name,date)

        await Supplier.findByIdAndUpdate(suppliers[supplier]._id,{$set:{tripName:name,date}},{new:true})
    }
   
}

export const updateClientDate = async(supplierRef,name,date)=>{

    const clients = await Client.find({supplierRef})
    // if(!expenses) return res.status(400).json(Error)

    for (let client = 0; client<clients.length;client++ ){

        await Client.findByIdAndUpdate(clients[client]._id,{$set:{date}},{new:true})
    }
   
}


