import React from 'react'
import Table from '../components/Table';
import {tripTable} from '../data/TableHeading'
export default function Trip() {

  return (
    <React.Fragment>

    <Table tableDataApi = '/api/trip/getTrips'
     tableHeading={tripTable} column2='weight' 
     title="Trips" column4='trip_payment' 
     column3='expense' path='/addTrip' actionPath= '/tripProfile/' 
     deleteApi = '/api/trip/deleteTrip/' editPath='editTrip/' searchApi='/searchTrip'/>

  </React.Fragment>
    
  )
}
