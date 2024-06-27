import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

export default function EditTrip() {

    const [formData,setFormData] = useState({"name":"","date":"","trip_payment":""});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    // const {currentEmploye} = useSelector((state)=>state.employe)
    const navigate = useNavigate();
  
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });

    //   console.log({formData})
    };
  
    //linking our api to send req to the server
    const handleSubmit = async(e)=>{
    //   console.log({formData})
      setLoading(true);
      e.preventDefault();
      try{
        //making a request to the server
        // console.log(formData)
        const res = await fetch('/api/trip/create',{
          method:'POSt',
          headers:{'content-type':'application/json',},
          body:JSON.stringify(formData)
        }
        );
        //getting response from the server
        const data =  await res.json();
        // console.log(data)
  
        //if response is false, show the error message to the client
        if(data.success===false){
          setLoading(false);
          setError(data.message);
          return
        }
  
        //if response is True, register and navigate to the sign in page
        setLoading(false);
        setError(null)
        // navigate('/')
        handleOnClose()
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }

    const handleOnClose = ()=>{
        navigate('/')
    }

  return (

       <div className='w-full h-full bg-slate-200 grid place-items-center'>
         
        <h3 className='mt-4  text-5xl'>EDIT TRIP</h3>

            <form className='flex flex-col w-[500px] P-4' onSubmit={handleSubmit}  >

              <div className='flex flex-col gap-4'>

                    <label className='mb-4  text-1xl font-semibold'>Date</label>
                    <input type="Date" placeholder="sky team name" id='date' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                  />

                  <label className='mb-4 text-1xl font-semibold'>Trip name</label>
                  <input type="text" placeholder="sky team name" id='name' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='mb-4 text-1xl font-semibold'>Trip payment</label>
                    <input type="Number" placeholder="Trip Payment" id='trip_payment' className='border p-3 rounded-lg'
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


