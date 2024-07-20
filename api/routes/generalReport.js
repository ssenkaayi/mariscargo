
import express from 'express'
import { generalReport} from '../controllers/clientController.js'

const route = express.Router()

route.get('/:year/:month', generalReport)


export default route