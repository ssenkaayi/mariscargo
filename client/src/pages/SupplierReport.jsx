import React from 'react'
import { useState } from 'react';
import ViewReport from '../components/ViewReport';
import { supplierTable } from '../data/TableHeading';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function SupplierReport() {

    const params = useParams() 
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [reportData,setReportData] = useState([])
    const [tripDetails,setTripDetails] = useState({number:0,totalExpense:0,totalTrip_Payment:0,totalWeight:0})
  
    const year = params.year
    const month = params.month
    const type = params.type
  
    const title = `SUPPLIER REPORT FOR  `
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
        const res = await fetch(`/api/${type}/${year}/${month}`,{
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
        setReportData(data.suppliers)
        setTripDetails(data)
        
        // navigate('/')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }

  return (

    <div>

        < ViewReport reportDetails={tripDetails} tableData={reportData} tableHeading={supplierTable} column1='tripName'
        column2='weight' column3='no_clients' title='supplier' details1='payments' details2='deliveries' details3='supplies'
        detailsData1={tripDetails.totalPayments} detailsData2={tripDetails.totalDeliveries} month={month} year={year}/>

    </div>
  )
}
