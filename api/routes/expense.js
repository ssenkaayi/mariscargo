import express from 'express'
import { createExpense, getExpenses } from '../controllers/expenseController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'

const route = express.Router()

route.post('/',createExpense)
route.get('/',verifyToken, getExpenses)


export default route