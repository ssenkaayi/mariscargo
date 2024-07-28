import React, { Fragment } from 'react'
import Search from '../components/Search'
import { clientTable } from '../data/TableHeading'

export default function SearchClient() {

  return (
    
    <React.Fragment>

      <Search tableDataApi = '/api/client/search/'  tableHeading={clientTable} 
      column2='weight' title="Clients" column4='deliveries' 
      column3='payments' path='/clients' actionPath= '/clientProfile/' 
      deleteApi = '/api/client/' editPath='/editClient/' searchApi='/searchClient'
      />

    </React.Fragment>
  )
}
