import React from 'react'
import Table from '../components/Table'
import { useEffect } from 'react'
import { useState } from 'react'
import { paymentTable } from '../data/TableHeading'

export default function Payment() {

  const[clientData, updateClientData] = useState([])

  useEffect(()=>{

    fetchClient()

  },[])

  const fetchClient = async()=>{

    try{

      const res = await fetch('/api/payment/',{
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

    <Table tableBody={clientData} tableHeading={paymentTable}
     column2='recieptNo' path='/clients'
    title="Payments" column3='amount' column4='kg_rate'/>

  </React.Fragment>

  )
}
