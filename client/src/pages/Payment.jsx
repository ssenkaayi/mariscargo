import React from 'react'
import Table from '../components/Table'
import { useEffect } from 'react'
import { useState } from 'react'
import { paymentTable } from '../data/TableHeading'

export default function Payment() {

  return (

  <React.Fragment>

    <Table tableDataApi = '/api/payment'  tableHeading={paymentTable}
     column2='recieptNo' path='/clients'
    title="Payments" column3='amount' column4='kg_rate'/>

  </React.Fragment>

  )
}
