
import mongoose from "mongoose";

const tripSchema = mongoose.Schema({

    name : {type:String,required:true},
    weight:{type:Number,default:0},
    expense:{type:Number,default:0},
    date:{type:Date,required:true},
    trip_payment:{type:Number,default:0,required:true},
},{ timestamps: true })

const Trip = mongoose.model('Trip',tripSchema)

export default Trip