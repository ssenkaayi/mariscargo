import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { supplierTable } from '../data/TableHeading';
import { tripProfileTable } from '../data/TableHeading';
import Table from '../components/Table';
import ProfileTable from '../components/ProfileTable';
import { expenseProfileTable } from '../data/TableHeading';

export default function TripProfile(props) {

  const {actionPath1} = props

  const params = useParams() 
  const trip_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [tripDetails,setTripDetails]=useState([]) 
  const navigate = useNavigate()
  const [suppliers , setSuppliers] = useState([])
  const [expenses , setExpenses] = useState([])



  const handlePrint =()=>{
      window.print()
    }

    // const goBackClient = ()=>{
    //   navigate(`/trips`)
    // }


    useEffect(()=>{


        fetchTrip()
    
    },[trip_id])
    
    const fetchTrip = async()=>{
  
      try{
    
        setLoading(true);
        const res = await fetch(`/api/trip/getTrip/${trip_id}`,{
          
          method:'GET',
        
        })
    
        const data = await res.json();
        setSuppliers(data.suppliers)
      
        if(data.succuss===false){
          setError(true)
          setLoading(false)
          return
        }
        
        setError(false)
        setLoading(false)
        setTripDetails(data.trip)
        setSuppliers(data.suppliers)
        setExpenses(data.expense)
        // console.log(data)

      }
      catch(error){
        setError(error.message)
        setLoading(false)
    
      }
    }

    const handleAddSupplier = (id)=>{

      navigate('/addSupplier/'+id)
    }

    const handleAddExpense = (id)=>{

      navigate('/addExpenses/'+id)
    }
  return (
   

      <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>
  
        <div className='centered text-xl row-span-3 bg-white p-2 rounded-lg '>
  
          <div className='mt-2'>
            
              <p>TRIP DATA</p>
          </div>
  
          <div className='mt-2'>
              <p className='flex gap-8'><span className='w-20'> Weight:</span><span>{tripDetails.weight}</span></p >
              <p className='flex gap-8'><span className='w-20'> Trip:</span><span>{tripDetails.name}</span></p >
              <p className='flex gap-8'><span className='w-20'> Date:</span><span>{tripDetails.date}</span></p >
              <p className='flex gap-8'><span className='w-20'>Payment:</span><span>{tripDetails.trip_payment}</span></p >
              <p className='flex gap-8'><span className='w-20'>Expenses:</span><span>{tripDetails.expense}</span></p >
          </div>
  
  
        </div>

        <div  className='centered text-xl row-span-3 bg-white p-2 rounded-lg '>
            
          <div className='flex m-4 justify-between'>

            <h3 className='text-regal-violet text-2xl'> <strong>EXPENSES </strong></h3>

            <button 
              onClick={()=>handleAddExpense(tripDetails._id)}  className='flex items-center p-2 bg-gray-400 rounded-lg'>EXPENSES
            </button>

          </div>

          <ProfileTable tableBody={expenses}
            tableHeading={expenseProfileTable} column2='transport' 
            title="Trips" column4='market_fees' 
            column3='tax' path='/addTrip' actionPath= '/supplierProfile/'/>
      
        </div>
  
        <div  className='centered text-xl row-span-5 bg-white p-2 rounded-lg '>
              
          <div className='flex m-2 justify-between'>

            <h3 className='text-regal-violet text-2xl'> <strong> SUPPLIERS</strong></h3>

            <button 
              onClick={()=>handleAddSupplier(tripDetails._id)}  className='flex items-center p-2 bg-gray-400 rounded-lg'>ADD SUPPLIERS
            </button>

          </div>

          <ProfileTable tableBody={suppliers}
            tableHeading={tripProfileTable} column2='weight' 
            title="Trips" column4='trip_payment' 
            column3='payments' path='/addTrip' actionPath= '/supplierProfile/'/>
  
        </div>
  
      </div>
  
  
    )
  }

  

