import express from 'express'
import { createClient, deleteClient, getClient, getClients, updateClient, clientReport,searchClient} from '../controllers/clientController.js'

import { verifyToken } from '../utilities/verifyEmployee.js'

const route = express.Router()

route.post('/',createClient)
route.get('/',verifyToken,getClients)
route.put('/:id',updateClient)
route.get('/:id',getClient)
route.delete('/:id',deleteClient)  //,verifyToken
route.get('/getReport/:year/:month', clientReport)
route.get('/search/:search',searchClient)


export default route

