import React from 'react'
import { FaBookOpenReader} from "react-icons/fa6"
import { useDispatch} from 'react-redux';
import { signOutFailure,signOutStart,signOutSuccess } from '../redux/employe/employeSlice';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async()=>{

        try{

            dispatch(signOutStart())
            const res = await fetch('/api/employee',{method:"GET"});
            const data = await res.json();

            if(data.success===false){
            dispatch(signOutFailure(data.message));
            return
            }

            dispatch(signOutSuccess(data))
            navigate('/login')

        }catch(error){
            dispatch(signOutFailure(error.message))
        }

    }

  return (

    <React.Fragment>

        <section className='flex justify-between bg-slate-400 items-center p-3.5 pl-5 pr-5 rounded-lg w-full h-full'>

            <div className='flex space-x-4 ' >
                <div>

                    <FaBookOpenReader className='text-white text-4xl'/>

                </div>

                <div>

                    <p className='text-white text-3xl'> Maris Cargo Limited </p>

                </div>

            </div>

            <div>

                <button className='bg-slate-300 rounded-lg p-2 uppercase cursor-pointer text-white' onClick={handleLogout}>
                    logout
                </button>

            </div>

        </section>
    </React.Fragment>

    
  )
}
