import React from 'react'
import { useState } from 'react';
import ViewReport from '../components/ViewReport';
import { tripTable } from '../data/TableHeading';

export default function SupplierReport() {

    // const params = useParams() 
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [reportData,setReportData] = useState([])
    const [tripDetails,setTripDetails] = useState({number:0,totalExpense:0,totalTrip_Payment:0,totalWeight:0})
  
    // const year = params.year
    // const month = params.month
    // const type = params.type
  
    const title = `SUPPLIER REPORT FOR  `
    //   IN ${month} OF ${year}

  return (

    <div>

        < ViewReport reportDetails={tripDetails} tableData={reportData} tableHeading={tripTable} column1='weight'
        column2='expense' column3='trip_payment' title={title}/>

    </div>
  )
}
