import React from 'react'
import { useState } from 'react';
import ViewReport from '../components/ViewReport';
import { clientTable } from '../data/TableHeading';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';


export default function ClinetReport() {
    const params = useParams() 
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [reportData,setReportData] = useState([])
    const [tripDetails,setTripDetails] = useState([])
    const [clientDetails,setClientDetails] = useState({weight:0,payments:0,deliveries:0,count:0})
  
    const year = params.year
    const month = params.month
    const type = params.type
  
    const title = `GENERAL REPORT FOR  IN ${month} OF ${year}`
    //   

    useEffect(()=>{

      fetchReportData()
    },[]
      
    )
  
    //linking our api to send req to the server
    const fetchReportData = async(e)=>{
  
      setLoading(true);
  
      try{
        //making a request to the server
        const res = await fetch(`/api/${type}/${year}/${month}`,{
          method:'GET',
        }
        );
        //getting response from the server
        const data =  await res.json();
        // console.log(data)
  
        //if response is false, show the error message to the client
        if(data.success===false){
          setLoading(false);
          setError(data.message);
          return
        }
  
        //if response is True, register and navigate to the sign in page
        setLoading(false);
        setError(null)
        setReportData(data.suppliers)
        setTripDetails(data.trips)
        setClientDetails(data.clients[0])
        
        // navigate('/')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }

    const handlePrint =()=>{
        window.print()
      }
    
  return (

    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

    <div className='centered row-span-10 bg-white p-2 rounded-lg '>

        <div className='mb-3 mt-2 text-xl'>
            
            <p>{title}</p>
        </div>

        <div className='m-2 text-x '>
            <p className='flex gap-8'><span className='w-50'>WEIGHT</span><span>{clientDetails.weight}</span></p >
            <p className='flex gap-8'><span className='w-50'>PAYMENTS</span><span>{clientDetails.payments}</span></p >
            <p className='flex gap-8'><span className='w-50'> DELIVERIES</span><span>{clientDetails.deliveries}</span></p >
            <p className='flex gap-8'><span className='w-50'>NO CLIENTS</span><span>{clientDetails.count}</span></p >
        </div>

        <table className='w-full bordered hover mt-5'>

            <thead className='bg-slate-300'>

                <tr>

                    <th className='p-2 text-center'>Trip</th>
                    <th className='p-2 text-center'>No Tripss</th>
                    <th className='p-2 text-center'>Weight</th>
                    <th className='p-2 text-center'>Trip Payments</th>
                    <th className='p-2 text-center'>Expenses</th>


                </tr>

            </thead >

            <tbody className='p-1 mb-5 mt-10'>

                {tripDetails.length>0?tripDetails.map((client,index)=>{

                return(  
                    
                    <tr className='text-center ' key={client._id}>

                    <td className='p-2'>{client._id}</td>
                    <td >{client.count}</td>
                    <td >{client.weight}</td>
                    <td >{client.trip_payment}</td>
                    <td >{client.expense}</td>

                    </tr>                  

                )
                }):<tr className='text-center'>

                <td className='text-center'>{title} not available </td>

                </tr>}

            </tbody>

        </table>

        <table className='w-full bordered hover mt-5'>

            <thead className='bg-slate-300'>

                <tr>

                    <th className='p-2 text-center'>Supplier</th>
                    <th className='p-2 text-center'>No Clinets</th>
                    <th className='p-2 text-center'>Weight</th>
                    <th className='p-2 text-center'>No Trips</th>

                </tr>

            </thead >

            <tbody className='p-1 first-letter:'>

                {reportData.length>0?reportData.map((client,index)=>{

                return(  
                    
                    <tr className='text-center ' key={client._id}>

                    <td className='p-2'>{client._id}</td>
                    <td >{client.no_clients}</td>
                    <td >{client.weight}</td>
                    <td >{client.count}</td>
                    <td >{client.expense}</td>

                    </tr>                  

                )
                }):<tr className='text-center'>

                <td className='text-center'>{title} not available </td>

                </tr>}

            </tbody>

        </table>

    </div>

    <div  className='centered text-x row-span-1 bg-white p-2 rounded-lg '>
    
        <div>

        <button 
            onClick={()=>handlePrint()}  className='flex text-sm items-center p-2 ml-8 bg-gray-400 rounded-lg'>PRINT
        </button>


            
        </div>
    </div>

</div>
  )
}
