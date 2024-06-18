import express from 'express'
import clientRoutesHandler from './routes/client.js'
import tripRoutesHandler from './routes/trip.js'
import supplierRouteHandler from './routes/supplier.js'
import userRouteHandler from './routes/user.js'
import deliveryRouteHandler from './routes/deliveriy.js'
import paymentRouteHandler from './routes/payment.js'
import expenseRouteHandler from './routes/expense.js'
import employeRouteHandler from './routes/user.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import path from 'path'

dotenv.config();

// calling express function and assigning it to the server variable 
//creating an instance of a server from the express object


// connecting to the database

const connectdb = async()=>{
    
    try{

        await mongoose.connect(process.env.DB_URL )
        console.log('connected to db')

        startServer()
        
    }catch(error){
        console.log('error starting connecting to the database')
    }
    
}

connectdb()

const __dirname = path.resolve();

const server = express()



// middle wares
server.use(express.json())
server.use(bodyParser.json())
server.use(cookieParser());

server.use('/api/user', userRouteHandler )
server.use('/api/trip',tripRoutesHandler)
server.use('/api/client',clientRoutesHandler)
server.use('/api/supplier', supplierRouteHandler)
server.use('/api/delivery', deliveryRouteHandler)
server.use('/api/payment',paymentRouteHandler)
server.use('/api/expense',expenseRouteHandler)
server.use('/api/employee',employeRouteHandler)

server.use(express.static(path.join(__dirname,'/client/dist' )))

server.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist' ,'index.html'))
})


// starting up the server by using the listen method and assign the server a port


//creating an error Handler
server.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    
    res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message,
    });
})


const PORT = 4000 ||process.env.PORT 

const startServer = ()=>{

    server.listen(PORT, ()=>{
    
        console.log(`server is up and running on port ${PORT}....`)
    })

}

