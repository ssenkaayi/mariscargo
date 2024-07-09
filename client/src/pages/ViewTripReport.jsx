import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import {tripTable} from '../data/TableHeading'
import ViewReport from '../components/ViewReport'

export default function ViewTripReport() {

  const params = useParams() 
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [reportData,setReportData] = useState([])

  const year = params.year
  const month = params.month
  const type = params.type

  const title = `REPORT FOR TRIPS IN ${month} OF ${year}`

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
      setReportData(data.trips)
      
      // navigate('/')

    }catch(error){
      setLoading(false);
      setError(error.message);

    } 
  }
  

  return (
   
   <div>

    < ViewReport tableData={reportData} tableHeading={tripTable} column1='weight'
    column2='expense' column3='trip_payment' title={title}/>

   </div>


  )
}
