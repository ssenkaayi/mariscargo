

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({

    name:{type:String,required:true,},
    ticket_fees:{type:Number,default:0,required:true},
    tax:{type:Number,required:true},
    tripRef:{type:String,required:true, unique: true },
    transport:{type:Number,default:0},
    date:{type:Date,required:true},
    market_fees:{type:Number,default:0}

},{ timestamps: true })

const Expense = mongoose.model('Expense',expenseSchema)
export default Expense