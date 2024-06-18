import express from 'express'
import { createSupplier, deleteSupplier, getSupplier, getSuppliers, updateSupplier,} from '../controllers/supplierController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'


const route = express.Router()


route.post('/', createSupplier)
route.put('/:id',verifyToken, updateSupplier)
route.delete('/:id',deleteSupplier)
route.get('/:id',getSupplier)
route.get('/',verifyToken,getSuppliers)


export default route