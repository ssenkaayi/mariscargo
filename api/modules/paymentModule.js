import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(

    {
        date:{type:Date,required:true},
        name:{type:String,required:true},
        amount:{type:Number,required:true},
        recieptNo:{type:String,required:true},
        kg_rate:{type:Number,required:true},
        clientRef:{type:String,required:true}
        
    },{ timestamps: true }
)

export const Payment = mongoose.model('Payment',paymentSchema)
