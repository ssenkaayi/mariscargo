import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom'
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

export default function EditSupplier() {

    const [formData,setFormData] = useState({"name":"",});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const params = useParams() 
    const supplier_id = params.id
    // const {currentEmploye} = useSelector((state)=>state.employe)
    const navigate = useNavigate();
  
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });

     
    };
  
    //linking our api to send req to the server
    const handleSubmit = async(e)=>{
      console.log({formData})
      setLoading(true);
      e.preventDefault();

      try{
        //making a request to the server
        const res = await fetch(`/api/supplier/${supplier_id}`,{
          method:'PUT',
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
        handleOnClose()
        alert('data updated successfully')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }
    useEffect(()=>{

      fetchClient()
  
    },[])
  
    const fetchClient = async()=>{
      
      setLoading(true);
  
      try{
  
        const res = await fetch(`/api/supplier/${supplier_id}`,{
          method:'GET',
        })
    
        const data = await res.json()
        console.log(data.supplier)
  
        if(data.success===false){
          console.log(data.message)
          return
        }
  
        if(data.message === 'token expired'){
          
          window.localStorage.clear()
          window.location.href = './login'
          alert('token expired login again')
  
        }
  
        setFormData(data.supplier)
        setLoading(false);
        setError(error.message);
    
  
      }catch(error){
        // console.log(error)
        setLoading(false);
        // setError(error.message);
      }
  
    } 
    const handleOnClose = ()=>{
      navigate('/suppliers')
    }

  return (

       <div className='w-full h-full bg-slate-200 grid place-items-center'>
         
        <h3 className='mt-4  text-5xl'>EDIT SUPPLIER</h3>

            <form className='flex flex-col w-[500px] P-4' onSubmit={handleSubmit}  >

              <div className='flex flex-col gap-4'>

                  <label className='mb-4 text-1xl font-semibold'>Supplier name</label>
                  <input type="text" placeholder="sky team name" id='name' value={formData.name} className='border p-3 rounded-lg'
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


