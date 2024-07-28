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
    const [tripDetails,setTripDetails] = useState({number:0,totalExpense:0,totalTrip_Payment:0,totalWeight:0})
  
    const year = params.year
    const month = params.month
    const type = params.type
  
    const title = `CLIENT REPORT FOR  `
    //   IN ${month} OF ${year}

    useEffect(()=>{

      fetchReportData()
    },[]
      
    )
  
    //linking our api to send req to the server
    const fetchReportData = async(e)=>{
  
      setLoading(true);
  
      try{
        //making a request to the server
        const res = await fetch(`/api/${type}/getReport/${year}/${month}`,{
          method:'GET',
        }
        );
        //getting response from the server
        const data =  await res.json();
        console.log(data)
  
        //if response is false, show the error message to the client
        if(data.success===false){
          setLoading(false);
          setError(data.message);
          return
        }
  
        //if response is True, register and navigate to the sign in page
        setLoading(false);
        setError(null)
        setReportData(data.clients)
        setTripDetails(data)
        
        // navigate('/')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }
    

  return (

    <div>

        < ViewReport reportDetails={tripDetails} tableData={reportData} tableHeading={clientTable} column1='weight'
        column2='payments' column3='deliveries' title={title} details1='payments' details2='deliveries' details3='clients'
        detailsData1={tripDetails.totalPayments} detailsData2={tripDetails.totalDeliveries}/>

    </div>
  )
}
