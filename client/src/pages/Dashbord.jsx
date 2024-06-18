import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashbord() {

  const navigate = useNavigate()

  const handleCreateEmployee = ()=>{

    navigate('/addEmployee')
  }

  return (

    <div className='grid grid-rows-11 p-2 gap-3 h-full w-full' >

      <div className='centered text-2xl row-span-1 bg-white p-2 rounded-lg flex justify-between items-center'>
        
        <div>
          Manage 
        </div>

        <button className='bg-slate-300 rounded-lg p-1 cursor-pointer' onClick={handleCreateEmployee}>

          ADD EMPLOYEE

        </button>
          
      </div>

      <div className='centered text-xl row-span-10 bg-white p-2 rounded-lg'>

      </div>

      {/* <div className='centered text-2xl row-span-1 bg-white p-2 rounded-lg flex justify-between'>

      </div> */}

    </div>
    
    
  )
}
