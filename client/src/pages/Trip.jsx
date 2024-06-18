import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Table from '../components/Table';
import {tripTable} from '../data/TableHeading'
export default function Trip() {

  const[clientData, updateClientData] = useState([])

  useEffect(()=>{

    fetchClient()

  },[])

  const fetchClient = async()=>{

    try{

      const res = await fetch('/api/trip/getTrips',{
        method:'GET',
      })
  
      const data = await res.json()
      console.log(data.message)

      if(data.message === 'token expired'){
        alert('token expired login again')
        window.localStorage.clear()
        window.location.href = './login'
      }

      updateClientData(data)

    }catch(error){
      console.log(error)
    }

  }
  return (
    <React.Fragment>

    <Table tableBody={clientData}
     tableHeading={tripTable} column2='weight' 
     title="Trips" column4='trip_payment' 
     column3='expense' path='/addTrip' actionPath= '/tripProfile/' />

  </React.Fragment>
    
  )
}
