import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom'
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

export default function TripReport() {

    const [formData,setFormData] = useState({});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    // const params = useParams() 
    // const supplier_id = params.id
    // const {currentEmploye} = useSelector((state)=>state.employe)
    const navigate = useNavigate();
  
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });

      if(e.target.id === 'client'|| e.target.id === 'supplier'||e.target.id === 'general'|| e.target.id === 'trip'|| e.target.id === 'store'){
        setFormData({...formData,role:e.target.id})
    };

    };
  
    const handleOnClose = ()=>{
      navigate('/suppliers')
    }

    const handleSubmit = ()=>{

      navigate(`/${formData.role}Report/${formData.role}/${formData.year}/${formData.month}`)

    }

  return (

       <div className='w-full h-full bg-slate-200 grid place-items-center'>
         
        <h3 className='mt-4  text-5xl'>GENERATE TRIP REPORT</h3>

            <form className='flex flex-col w-[500px] P-4' onSubmit={handleSubmit}  >

              <div className='flex flex-col gap-4'>

                    <label className='mb-4 text-1xl font-semibold'>Select Report Type</label>
                    <div className='flex flex-row gap-6 flex-wrap'>

                        <div className='flex gap-2'>
                            <input type='checkbox' onChange={handleChange} checked={formData.role==='client'} id='client' className='w-5'></input>
                            <span>Clients</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' onChange={handleChange}  id='supplier' checked={formData.role==='supplier'} className='w-5'></input>
                            <span>Suppliers</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='trip' onChange={handleChange} checked={formData.role==='trip'} className='w-5'></input>
                            <span>Trips</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='general' onChange={handleChange} checked={formData.role==='general'} className='w-5'></input>
                            <span>General Report</span>
                        </div>

                        {/* <div className='flex gap-2'>
                            <input type='checkbox' id='delivery' onChange={handleChange} checked={formData.role==='delivery'} className='w-5'></input>
                            <span>Delivery</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='store' onChange={handleChange} checked={formData.role==='store'}  className='w-5'></input>
                            <span>Payments</span>
                        </div> */}

                    </div>

                <label className='mb-4 text-1xl font-semibold'>Month</label>
                <input type="number" placeholder="Month" min={1} id='month' value={formData.name} className='border p-3 rounded-lg'
                required onChange={handleChange}
                />

                <label className='mb-4 text-1xl font-semibold'>Year</label>
                <input type="number" placeholder="Year" min={2024} id='year' value={formData.name} className='border p-3 rounded-lg'
                required onChange={handleChange}
                />

                <div className='mt-4 flex justify-between items-center'>
                    
                  <button onClick={handleOnClose} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                  type="button"> cancel
                  </button>

                  <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                  > {loading? 'submiting...':'Submit'}
                  </button>

                </div>

              </div>

              {error && <p className='text-red-500 mt-5'>{error}</p>}

            </form>

        </div> 
  )
}


