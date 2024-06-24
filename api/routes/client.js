import express from 'express'
import { createClient, deleteClient, getClient, getClients, updateClient } from '../controllers/clientController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'

const route = express.Router()

route.post('/',createClient)
route.get('/',getClients)
route.put('/:id',updateClient)
route.get('/:id',getClient)
route.delete('/:id',deleteClient)  //,verifyToken


export default route

