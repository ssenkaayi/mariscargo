import React from 'react'
import Search from '../components/Search'
import { supplierTable } from '../data/TableHeading'

export default function SearchSupplier() {

  return (
    <React.Fragment>

    <Search tableDataApi = '/api/supplier' tableHeading={supplierTable}
     column2='tripName' title="Suppliers" column4='no_clients' 
     column3='weight' path='/' actionPath= '/supplierProfile/' 
     deleteApi = '/api/supplier/' editPath='/editSupplier/' searchApi='/searchSupplier'
    />

  </React.Fragment>
)
  
}
