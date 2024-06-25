import React from 'react'
import { deliveryTable } from '../data/TableHeading'
import Table from '../components/Table'

export default function Deliveries() {

  return (

    <React.Fragment>

      <Table tableDataApi = '/api/delivery'tableHeading={deliveryTable}
       column2='weight' title="Deliveries" column3='no_pieces' 
       column4='deliverer' path='/clients' />

    </React.Fragment>
  )
}
