
import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(

    {
        date:{type:Date,required:true},
        name:{type:String,required:true},
        weight:{type:Number,required:true},
        balance:{type:Number,default:0},
        deliverer:{type:String,required:true},
        clientRef:{type:String,required:true}   
    },{ timestamps: true }
)

export const Delivery = mongoose.model('Delivery',deliverySchema)
