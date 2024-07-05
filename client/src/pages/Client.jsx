import React from 'react'
import Table from '../components/Table'
import { clientTable } from '../data/TableHeading'


export default function Client() {

  return (

    <React.Fragment>

      <Table tableDataApi = '/api/client'  tableHeading={clientTable} 
      column2='weight' title="Clients" column4='deliveries' 
      column3='payments' path='/clients' actionPath= '/clientProfile/' 
      deleteApi = '/api/client/' editPath='/editClient/'/>

    </React.Fragment>
    
  )
}

