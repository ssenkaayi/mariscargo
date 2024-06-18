import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom'
// import { useSelector } from 'react-redux';

export default function AddEmployee() {

    const [formData,setFormData] = useState({role:''});
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

      if(e.target.id === 'office'|| e.target.id === 'admin'||e.target.id === 'delivery'|| e.target.id === 'cashier'|| e.target.id === 'store'){
        setFormData({...formData,role:e.target.id})
    }

    };
  
    //linking our api to send req to the server
    const handleSubmit = async(e)=>{
      console.log({formData})
      setLoading(true);
      e.preventDefault();
      try{
        //making a request to the server
        console.log(formData)

        const res = await fetch('/api/employee/',{
          method:'POST',
          headers:{'content-type':'application/json',},
          body:JSON.stringify({...formData,clientRef:supplier_id})
          
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
        navigate('/clients')
    }

  return (

    <div className='w-full h-full bg-slate-200 grid place-items-center'>
         
            <h3 className='mt-4  text-5xl'>REGISTER NEW EMPLOYEE</h3>

            <form className='flex gap-10 P-4' onSubmit={handleSubmit}  >

            
                <div className='flex flex-col gap-4 w-[500px]'>

                    <label className='mb-4 text-1xl font-semibold'>Date</label>
                    <input type="date" placeholder="date" id='date' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />

                    <label className='mb-4 text-1xl font-semibold'>Name</label>
                    <input type="text" placeholder="name" id='name' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />

                    <label className='mb-4 text-1xl font-semibold'>Email</label>
                    <input type="email" placeholder="email" id='email' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />
                    
                    <label className='mb-4 text-1xl font-semibold'>Phone</label>
                    <input type="string" placeholder="phone" id='phone' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />


                </div>

                <div className='flex flex-col gap-4 w-[500px]'>


                    <label className='mb-4 text-1xl font-semibold'>Address</label>
                    <input type="string" placeholder="address" id='address' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />

                    <label className='mb-4 text-1xl font-semibold'>Roles</label>
                    <div className='flex flex-row gap-6 flex-wrap'>

                        <div className='flex gap-2'>
                            <input type='checkbox' onChange={handleChange} checked={formData.role==='office'} id='office' className='w-5'></input>
                            <span>Office</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' onChange={handleChange}  id='admin' checked={formData.role==='admin'} className='w-5'></input>
                            <span>Admin</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='cashier' onChange={handleChange} checked={formData.role==='cashier'} className='w-5'></input>
                            <span>Cashier</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='delivery' onChange={handleChange} checked={formData.role==='delivery'} className='w-5'></input>
                            <span>Delivery</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='store' onChange={handleChange} checked={formData.role==='store'}  className='w-5'></input>
                            <span>Store</span>
                        </div>

                    </div>


                    <label className='mb-4 text-1xl font-semibold'>Password</label>
                    <input type="password" placeholder="password" id='password' className='border p-3 rounded-lg'
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

                    {error && <p className='text-red-500 mt-5'>{error}</p>}

                </div>

              

            </form>

    </div> 
  )
}





