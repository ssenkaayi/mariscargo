import React from 'react'
import { useState } from 'react';
import ViewReport from '../components/ViewReport';
import { clientTable } from '../data/TableHeading';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


export default function ClinetReport() {
    const params = useParams() 
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [reportData,setReportData] = useState([])
    const [tripDetails,setTripDetails] = useState([])
    const [clientDetails,setClientDetails] = useState([])
  
    const year = params.year
    const month = params.month
    const type = params.type

    const months = ['START','JANUARY','FEBUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST']
  
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
        setClientDetails(data.clients)
        // console.log(clientDetails)
        
        // navigate('/')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }

    // const handlePrint =()=>{
    //     window.print()
    //   }

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

  return (

    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

    <div ref={contentToPrint}  className='centered row-span-10 bg-white p-2 rounded-lg '>

        <div className=' mb-5 mt-5 text-xl'>

            <h1 className='text-center text-5xl m-4'><strong>MARIS CARGO LIMITED</strong></h1>
            <strong className='uppercase text-center'> GENERAL REPORT FOR {months[month]} {year}</strong>
            
            {/* <p><strong>{title}</strong></p> */}
        </div>

        <h2 className='uppercase mt-5 mb-2'><strong>client monthly summury</strong></h2>

<table className='w-full bordered hover mt-5 mb-10'>

    <thead className='bg-slate-300'>

        <tr>

            <th className='p-2 text-center'>No Clients</th>
            <th className='p-2 text-center'>Weight</th>
            <th className='p-2 text-center'>Payments</th>
            <th className='p-2 text-center'>Deliveries</th>

        </tr>

    </thead >

    <tbody className='p-1 first-letter:'>

        {clientDetails.length>0?clientDetails.map((client,index)=>{

        return(  
            
            <tr className='text-center ' key={index}>

            <td className='p-2'>{client.count}</td>
            <td >{client.weight}</td>
            <td >{client.payments}</td>
            <td >{client.deliveries}</td>
            {/* <td >{client.expense}</td> */}

            </tr>                  

        )
        }):<tr className='text-center'>

        <td className='text-center'>{title} not available </td>

        </tr>}

    </tbody>

</table>

        <h2 className='uppercase mt-5 '><strong>trip monthly summury</strong></h2>


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

            <tbody className='p-1 mt-10'>

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

        <h2 className='uppercase mt-5'><strong>supplier monthly summury</strong></h2>

        <table className='w-full bordered hover mt-5 mb-0'>

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
                    <td >{client.weight.toFixed(1)}</td>
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

            <button className='flex text-sm items-center p-2 ml-8 bg-gray-400 rounded-lg' onClick={() => {

                handlePrint(null, () => contentToPrint.current);
                }}>
                PRINT
            </button>


            
        </div>
    </div>

</div>
  )
}
