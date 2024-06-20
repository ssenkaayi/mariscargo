import React from 'react'
import Table from '../components/Table'
import { useState } from 'react'
import { useEffect } from 'react'
import { clientTable, supplierTable } from '../data/TableHeading'

export default function Supplier() {

  const[clientData, updateClientData] = useState([])

  useEffect(()=>{

    fetchClient()

  },[])

  const fetchClient = async()=>{

    try{

      const res = await fetch('/api/supplier/',{
        method:'GET',
      })
  
      const data = await res.json()

      if(data.success===false){

        console.log(data.message)
        alert('token expired login again')
        window.localStorage.clear()
        window.location.href = './login'

        return
      }

      if(data.message === 'token expired'){
        alert('token expired login again')
        window.localStorage.clear()
        window.location.href = './login'
      }

      updateClientData(data)
  
      console.log(clientData)

    }catch(error){
      console.log(error)
    }
  }
  return (
    <React.Fragment>

    <Table tableBody={clientData} tableHeading={supplierTable}
     column2='_id' title="Suppliers" column4='no_clients' 
     column3='weight' path='/' actionPath= '/supplierProfile/'/>

  </React.Fragment>
    
  )
}
