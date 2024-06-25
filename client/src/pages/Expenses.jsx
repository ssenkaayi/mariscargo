import React from 'react'
import Table from '../components/Table'
import {expenseTable } from '../data/TableHeading'

export default function Expenses() {

  return (
    
    <React.Fragment>

    <Table tableDataApi = '/api/expense' 
      tableHeading={expenseTable} column2='ticket_fees' 
      title="Trips" column4='tax' 
      column3='transport' path='/addTrip' actionPath= '/supplierProfile/' />

  </React.Fragment>
  )
}
