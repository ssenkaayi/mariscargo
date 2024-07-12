import express from 'express'
import { createClient, deleteClient, getClient, getClients, updateClient, clientReport} from '../controllers/clientController.js'

import { verifyToken } from '../utilities/verifyEmployee.js'

const route = express.Router()

route.post('/',createClient)
route.get('/',getClients)
route.put('/:id',updateClient)
route.get('/:id',getClient)
route.delete('/:id',deleteClient)  //,verifyToken
route.get('/:year/:month', clientReport)


export default route

