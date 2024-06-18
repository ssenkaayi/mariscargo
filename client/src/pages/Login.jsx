import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/employe/employeSlice';
import { FaUser, FaLock } from 'react-icons/fa';


export default function Login() {

  const[employData,setEmployData] = useState({})
  const {loading,error} = useSelector((state)=>state.employe);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmployeData = (e)=>{

  setEmployData(

    {...employData,
      [e.target.id]:e.target.value,})

   
  }

  //linking our api to send req to the server
  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{
      console.log(employData)
      dispatch(signInStart())
      //making a request to the server
      const res = await fetch('/api/employee/login',{

        method:'POSt',
        headers:{'content-type':'application/json',},
        body:JSON.stringify(employData)

      }
      );
      //getting response from the server
      const data =  await res.json();

      // if response is false, show the error message to the client

      if(data.success===false){

        console.log(data.message)
        dispatch(signInFailure(data.message));

        return
      }

      // if(data.data === 'jwt expired'){
      //   alert('token expired login again')
      //   window.localStorage.clear()
      //   window.location.href = './login'
      // }

      //if response is True, register and navigate to the sign in page
      
      dispatch(signInSuccess(data));
      navigate('/')

    }catch(error){
      dispatch(signInFailure(error.message))
      
    } 
  }

  return (

<div className=' bg-slate-200 min-h-screen justify-center items-center flex rounded-lg'>


<div className='w-96 rounded-lg'>


  <form className='flex flex-col bg-slate-200 p-3 gap-y-4 w-[500px]' onSubmit={handleSubmit}  >

    <h3 className='text-3xl text-center font-semibold self-center mt-6 my-5'> MARIS CARGO LIMITED</h3>

    <div className='flex flex-col justify-center item-center'>

      < FaUser  className='text-slate-400 rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

      <h1 className='self-center mt-2'>Login</h1>           

    </div>

    <label className=''>Email</label>

    <div className='relative w-full h-1/2 '>
      <input type="email" placeholder="Enter email" id='email' className='outline-none w-full border p-3 rounded-lg'
      required onChange={handleEmployeData}
      />

    </div>
    
    <label className=''>Password</label>

    <div className='relative w-full h-1/2 '>  

      <input type="password" placeholder="Enter Password" id='password' 
      className='right-5 w-full border p-3 rounded-lg outline-none' required onChange={handleEmployeData}
      />

    </div>

    <div className='w-full mb-6 mt-4'>

      <button className=' bg-slate-400 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
       >  Login
      </button>

    </div>

  </form>

  {error && <p className='text-red-500 mt-5'>{error}</p>}

</div>

</div>

  )
}
