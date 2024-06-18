import React from 'react'
import Table from '../components/Table'
import { useEffect } from 'react'
import { useState } from 'react'
import { clientTable } from '../data/TableHeading'


export default function Client() {

  const[clientData, updateClientData] = useState([])

  useEffect(()=>{

    fetchClient()

  },[])

  const fetchClient = async()=>{

    try{

      const res = await fetch('/api/client/',{
        method:'GET',
      })
  
      const data = await res.json()

      if(data.message === 'token expired'){
        alert('token expired login again')
        window.localStorage.clear()
        window.location.href = './login'
      }

      updateClientData(data)
  
      // console.log(clientData)

    }catch(error){
      console.log(error)
    }


  }
  return (

    <React.Fragment>

      <Table tableBody={clientData} tableHeading={clientTable} 
      column2='weight' title="Clients" column4='deliveries' 
      column3='payments' path='/suppliers' actionPath= '/clientProfile/'/>

    </React.Fragment>
    
  )
}

