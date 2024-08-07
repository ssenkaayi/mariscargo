import Expense from "../modules/expense.js"
import Trip from "../modules/tripModule.js"
import { isValidObjectId } from "mongoose";
import { updateExpenses } from "../utilities/updateWeight.js";
import { errorHandler } from "../utilities/internalErrorHandler.js";
import {expenseValidation} from '../utilities/validation.js'

export const createExpense = async(req,res,next)=>{

    try{
        // console.log(req.body)
        const tripExist = await Trip.findById(req.body.tripRef)
        if(!tripExist) return next(errorHandler(400,"supplier with supplierRef doesnt exist"))

        const expenseData = {...req.body,name:tripExist.name,date:tripExist.date}
        // console.log(expenseData)

        // verifying client req.body to ensure we are passing the right data to our database.
        const {error} = expenseValidation(expenseData)
        if(error) return next(errorHandler(400,error.details[0].message))

        const expenseExist = await Expense.findOne({tripRef:req.body.tripRef})
        if(expenseExist) return next(errorHandler(403,"expenses table for this trip exist"))

        // registering new client
        const expense = await Expense.create(expenseData)
        if(!expense) return next(errorHandler(400,'not successfull'))

        //update supplier and trip weight
        const updateExpense = updateExpenses(expense.tripRef)
        if(!updateExpense) return next(errorHandler(400,"updating weight failed"))

        res.status(200).json({"message":"expense creates sucessfull"})
    
    }catch(error){
        next(error)
    }
}

export const getExpenses = async(req,res)=>{

    try{
        const expenses = await Expense.find().sort({createdAt:-1}).limit(13)
        if(!expenses) return next(errorHandler(400,"failed to fetch expenses"))

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalExpenses = expenses.length
        results.pageCount = Math.ceil(expenses.length/limit)

        if(lastIndex < expenses.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = expenses.slice(startIndex,lastIndex)

        res.status(200).json(results)
    
    }
    catch(error){

        next(error)
    }
}