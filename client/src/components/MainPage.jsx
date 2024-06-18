import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import NavPage from './NavPage'
import { Outlet } from 'react-router-dom'

export const MainPage = () => {
  return (
    <React.Fragment>

        <div className=' grid h-screen bg-white w-screen grid-rows-12 gap-2 p-2'>

            <div className='row-span-1 rounded-lg'>
               
                <Navbar/>

            </div>

            <div className='row-span-11 bg-white grid grid-cols-12 gap-2 max-lg:grid-cols-11'>

                <div className='col-span-2 bg-slate-400 rounded-lg max-lg:grid-rows-2 max-lg:col-span-12'>

                    <Sidebar/>

                </div>

                <div className='col-span-10 bg-slate-400 rounded-lg max-lg:grid-rows-8 max-lg:col-span-12'>

                    <Outlet/>

                </div>

            </div> 


        </div>


    </React.Fragment>
    
  )
}
