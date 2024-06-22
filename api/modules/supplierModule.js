
import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(

    {
        name:{type:String,required:true,},
        weight:{type:Number,default:0},
        tripRef:{type:String,required:true},
        tripName:{type:String,required:true},
        date:{type:Date,required:true},
        no_clients:{type:Number,default:0},
    },{ timestamps: true }
)

const Supplier = mongoose.model('Supplier',supplierSchema)

export default Supplier