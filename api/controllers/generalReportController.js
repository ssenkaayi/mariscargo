import Client from '../modules/clientModule.js'
import Supplier from '../modules/supplierModule.js'
import Trip from '../modules/tripModule.js'

export const generalReport = async(req,res,next)=>{

    try{

        // console.log(req.body)

        const clients = await Client.aggregate([{
            $project:{name:1,weight:1,deliveries:1,payments:1,date:1,year:{$year:"$date"},month:{$month:"$date"}
            }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}}, 
            {
                $group: {
                    _id: "null",
                    count: { $count: { } },
                    weight:{$sum:"$weight"},
                    payments:{$sum:"$payments"},
                    deliveries:{$sum:"$deliveries"},
                }}
            
        ])
    
        if(!clients) return next(errorHandler(400,"failed to get supplier"))

        const suppliers = await Supplier.aggregate([{
        $project:{name:1,weight:1,date:1,tripName:1,no_clients:1,year:{$year:"$date"},month:{$month:"$date"}
        }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}},  {
            $group: {
                _id: "$name",
                count: { $count: { } },
                weight:{$sum:"$weight"},
                // tripName:{$sum:"$tripName"},
                no_clients:{$sum:"$no_clients"}
            }
        }])

        if(!suppliers) return next(errorHandler(400,"failed to get supplier"))

        const trips = await Trip.aggregate([{
            $project:{name:1,weight:1,date:1,expense:1,trip_payment:1,year:{$year:"$date"},month:{$month:"$date"}
            }},{$match:{year:parseInt(req.params.year),month:parseInt(req.params.month)}},{
            $group: {
                _id: "$name",
                count: { $count: { } },
                weight:{$sum:"$weight"},
                trip_payment:{$sum:"$trip_payment"},
                expense:{$sum:"$expense"}
        }}])
    
        if(!trips) return next(errorHandler(400,"failed to get trips")
        )

        const report = {}

        res.status(200).json({...report,suppliers,trips,clients})

    }catch(error){

        next(error)
    }


}