import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { deliveryTable } from '../data/TableHeading'
import Table from '../components/Table'

export default function Deliveries() {

    const[clientData, updateClientData] = useState([])

    useEffect(()=>{
  
      fetchClient()
  
    },[])
  
    const fetchClient = async()=>{
  
      try{
  
        const res = await fetch('/api/delivery/',{
          method:'GET',
        })
    
        const data = await res.json()

        if(data.message === 'token expired'){
          alert('token expired login again')
          window.localStorage.clear()
          window.location.href = './login'
        }
  
        updateClientData(data)
        // console.log(data)
  
      }catch(error){
        console.log(error)
      }
  
  
    }
  return (

    <React.Fragment>

      <Table tableBody={clientData} tableHeading={deliveryTable}
       column2='weight' title="Deliveries" column3='deliveries' 
       column4='deliverer' path='/clients' />

    </React.Fragment>
  )
}
