import express from 'express'
import { createPayment, getPayments, getPayment, deletePayment,updatePayment } from '../controllers/paymentController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'

const route = express.Router()

route.post('/',createPayment)
route.get('/',verifyToken,getPayments)
route.get('/:id',verifyToken,getPayment)
route.put('/:id',updatePayment)
route.delete('/:id',deletePayment)
export default route