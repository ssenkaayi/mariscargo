
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    name:{type:String,required:true,},
    weight:{type:Number,required:true},
    phone:{type:String,required:true},
    supplierRef:{type:String,required:true},
    date:{type:Date,required:true},
    payments:{type:Number,default:0},
    deliveries:{type:Number,default:0}

},{ timestamps: true })

const Client = mongoose.model('Client',clientSchema)
export default Client