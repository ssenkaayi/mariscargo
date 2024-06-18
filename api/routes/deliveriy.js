import express from 'express'
import { createDelivery, deleteDelivery, getDeliveries, getDelivery, updateDelivery } from '../controllers/deliveryContoller.js'
import { verifyToken } from '../utilities/verifyEmployee.js'


const route = express.Router()

route.post('/',createDelivery)
route.put('/:id',updateDelivery)
route.get('/',verifyToken,getDeliveries)
route.get('/:id',getDelivery)
route.delete('/:id',deleteDelivery)

export default route