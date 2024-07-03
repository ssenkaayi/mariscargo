import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import GenerateRport from '../components/GenerateRport'

export default function Dashbord() {

  const navigate = useNavigate()

  const handleCreateEmployee = ()=>{

    navigate('/addEmployee')
  }

  return (

    <div className='grid grid-rows-11 p-2 gap-3 h-full w-full bg-slate-200' >

      <div className='centered text-2xl row-span-1 bg-white p-2 rounded-lg flex justify-between items-center'>
        
        <div>
          Manage 
        </div>

        <div className='gap-2 flex'>

          <button className='bg-slate-300 rounded-lg p-1 cursor-pointer' onClick={handleCreateEmployee}>

            ADD EMPLOYEE

          </button>

          
          <button className='bg-slate-300 rounded-lg p-1 cursor-pointer' onClick={handleCreateEmployee}>

            EDIT EMPLOYEE

          </button>

          <button className='bg-slate-300 rounded-lg p-1 cursor-pointer' onClick={handleCreateEmployee}>

            EDIT EMPLOYEE

          </button>

        </div>


          
      </div>

      <div className='centered text-xl row-span-10 bg-white p-2 rounded-lg gap-4 flex'>

        <GenerateRport heading='TRIP REPORT' reportApi='/api/trip/find/'/>
        <GenerateRport heading='SUPPLIER REPORT'/>
        <GenerateRport heading='CLIENT REPORT'/>
        <GenerateRport heading='GENERAL REPORT'/>

      </div>

    </div>
    
    
  )
}
