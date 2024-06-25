import React from 'react'
import Table from '../components/Table'
import { clientTable, supplierTable } from '../data/TableHeading'

export default function Supplier() {

  return (
    <React.Fragment>

    <Table tableDataApi = '/api/supplier' tableHeading={supplierTable}
     column2='tripName' title="Suppliers" column4='no_clients' 
     column3='weight' path='/' actionPath= '/supplierProfile/' deleteApi = '/api/supplier/' />

  </React.Fragment>
    
  )
}
