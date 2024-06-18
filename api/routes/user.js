import express from 'express'
import { loginEmploye, logoutEmploye, registerEmploye } from '../controllers/userController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'


const route = express.Router()


route.post('/',registerEmploye)
route.post('/login',loginEmploye)
route.get('/',logoutEmploye)


export default route