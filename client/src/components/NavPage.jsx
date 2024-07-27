import React from 'react'

import {Routes, Route} from 'react-router-dom'
import Trip from '../pages/Trip'
import Payment from '../pages/Payment'
import Deliveries from '../pages/Deliveries'
import PrivateRoutes from './PrivateRoutes'
import { MainPage } from './MainPage'
import Login from '../pages/Login'
import Supplier from '../pages/Supplier'
import Expenses from '../pages/Expenses'
import Dashbord from '../pages/Dashbord'
import Client from '../pages/Client'
import AddClient from '../pages/AddClient'
import AddTrip from '../pages/AddTrip'
import AddSupplier from '../pages/AddSupplier'
import AddDeliveries from '../pages/AddDeliveries'
import AddPayment from '../pages/AddPayment'
import AddExpenses from '../pages/AddExpenses'
import ClientProfile from '../pages/ClientProfile'
import SupplierProfile from '../pages/SupplierProfile'
import TripProfile from '../pages/TripProfile'
import EditClient from '../pages/EditClient'
import EditSupplier from '../pages/EditSupplier'
import EditDeliver from '../pages/EditDeliver'
import EditPayment from '../pages/EditPayment'
import EditExpenses from '../pages/EditExpenses'
import EditTrip from '../pages/EditTrip'
import TripReport from '../pages/TripReport'
import SearchTrip from '../pages/SearchTrip'
import ViewTripReport from '../pages/ViewTripReport'
import AddEmployee from '../pages/AddEmployee'
import SupplierReport from '../pages/SupplierReport'
import ClinetReport from '../pages/ClinetReport'
import GeneralReport from '../pages/GeneralReport'
import SearchClient from '../pages/SearchClient'
import SearchSupplier from '../pages/SearchSupplier'

export default function NavPage() {
  return (
    <React.Fragment>

      <section>
          
      <Routes>

        <Route element={<PrivateRoutes/>}>

          <Route path='/' element={<MainPage/>}>

            <Route path='/' element={<Trip/>}/>
            <Route path='/suppliers' element={<Supplier/>}/>
            <Route path='/payments' element={<Payment/>}/>
            <Route path='/deliveries' element={<Deliveries/>}/>
            <Route path='/clients' element={<Client/>}/>
            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/dashbord' element={<Dashbord/>}/>
            <Route path='/addClient/:id' element={<AddClient/>}/>
            <Route path='/addTrip' element={<AddTrip/>}/>
            <Route path='/addSupplier/:id' element={<AddSupplier/>}/>
            <Route path='/addDeliveries/:id' element={<AddDeliveries/>}/>
            <Route path='/addPayment/:id' element={<AddPayment/>}/>
            <Route path='/addExpenses/:id' element={<AddExpenses/>}/>
            <Route path='/clientProfile/:id' element={<ClientProfile/>}/>
            <Route path='/supplierProfile/:id' element={<SupplierProfile/>}/>
            <Route path='/tripProfile/:id' element={<TripProfile/>}/>
            <Route path='/editClient/:id' element={<EditClient/>}/>
            <Route path='/editTrip/:id' element={<EditTrip/>}/>
            <Route path='/editSupplier/:id' element={<EditSupplier/>}/>
            <Route path='/editDelivery/:id' element={<EditDeliver/>}/>
            <Route path='/editPayment/:id' element={<EditPayment/>}/>
            <Route path='/editExpenses/:id' element={<EditExpenses/>}/>
            <Route path='/addEmployee' element={<AddEmployee/>}/>
            <Route path='/TripReport' element={<TripReport/>}/>
            <Route path='/supplierReport/:type/:year/:month' element={<SupplierReport/>}/>
            <Route path='/clientReport/:type/:year/:month' element={<ClinetReport/>}/>
            <Route path='/tripReport/:type/:year/:month' element={<ViewTripReport/>}/>
            <Route path='/generalReport/:type/:year/:month' element={<GeneralReport/>}/>
            <Route path='/searchClient' element={<SearchClient/>}/>
            <Route path='/searchTrip' element={<SearchTrip/>}/>
            <Route path='/searchSupplier' element={<SearchSupplier/>}/>

          </Route>

        </Route>

        <Route path='/login' element={<Login/>}/>

      </Routes>

      </section>

    </React.Fragment>
  
  )
}
