import express from 'express'
import { createTrip, getTrips,getTrip, updateTrip, deleteTrip, findTripsByDate } from '../controllers/tripController.js'
import { verifyToken } from '../utilities/verifyEmployee.js'
const route = express.Router()

route.post('/create',createTrip)
route.get('/getTrips',verifyToken,getTrips)
route.get('/getTrip/:id',getTrip)
route.put('/updateTrip/:id',updateTrip)
route.delete('/deleteTrip/:id',deleteTrip)
route.get('/find/:year/:month',findTripsByDate)


export default route