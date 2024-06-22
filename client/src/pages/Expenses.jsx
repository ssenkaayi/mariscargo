import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Table from '../components/Table'
import {expenseTable } from '../data/TableHeading'

export default function Expenses() {

  const[expenseData, updateExpenseData] = useState([])

  useEffect(()=>{

    fetchClient()

  },[])

  const fetchClient = async()=>{

    try{

      const res = await fetch('/api/expense',{
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

      updateExpenseData(data)
      // console.log(data)

    }catch(error){
      console.log(error)
    }


  }
  return (
    
    <React.Fragment>

    <Table tableBody={expenseData} 
      tableHeading={expenseTable} column2='ticket_fees' 
      title="Trips" column4='tax' 
      column3='transport' path='/addTrip' actionPath= '/supplierProfile/' />

  </React.Fragment>
  )
}
