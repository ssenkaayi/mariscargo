import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { supplierProfileTable } from '../data/TableHeading';
import ProfileTable from '../components/ProfileTable';

export default function SupplierProfile(props) {

  const {actionPath1} = props

  const params = useParams() 
  const supplier_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [supplierDetails,setSupplierDetails]=useState([]) 
  const navigate = useNavigate()
  const [clients , setClients] = useState([])



  const handlePrint =()=>{
      window.print()
    }

    const goBackClient = ()=>{
      navigate(`/trips`)
    }


    useEffect(()=>{


      fetchSupplier()
    
    },[])
    
    const fetchSupplier = async()=>{
  
      try{
    
        setLoading(true);
        const res = await fetch(`/api/supplier/${supplier_id}`,{
          
          method:'GET',
        
        })
    
        const data = await res.json();
        // setSuppliers(data.suppliers)
        setSupplierDetails(data.supplier)
        setClients(data.clients)
        // console.log(data)
      
        if(data.succuss===false){
          setError(true)
          setLoading(false)
          return
        }
        
        setError(false)
        setLoading(false)
   
      }
      catch(error){
        setError(error.message)
        setLoading(false)
    
      }
    }

    const handleSkyTeamName = (id)=>{

      const btn_id = id

    }

    const handleOnClose = ()=>{
      
      // setShowAddSupplier(false)
  
    }
    const handleModifyClient = (id)=>{

      console.log(actionPath1)

      const route = '/clientProfile/' + id
      console.log(route)
  
      navigate(route)
    }

    const handleAddClient = (id)=>{

      navigate('/addClient/'+id)
    }
  return (
   

      <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>
  
        <div className='centered text-xl row-span-3 bg-white p-2 rounded-lg '>
  
          <div className='mb-3 mt-2'>
              
              <p>SUPPLIER PROFILE</p>
          </div>
  
          <div className='m-2'>
              <p className='flex gap-8'><span className='w-20'> Weight:</span><span>{supplierDetails.weight}</span></p >
              <p className='flex gap-8'><span className='w-20'> Trip:</span><span>{supplierDetails.name}</span></p >
              <p className='flex gap-8'><span className='w-20'> Date:</span><span>{supplierDetails.date}</span></p >
              <p className='flex gap-8'><span className='w-20'>ID No:</span><span>{supplierDetails._id}</span></p >
          </div>
  
        </div>
  
        <div  className='centered text-xl row-span-8 bg-white p-2 rounded-lg '>
          
          <div>
              
            <div className='flex m-4 justify-between'>
  
              <h3 className='text-xl'> <strong>CLIENTS </strong></h3>
  
              <button 
                onClick={()=>handleAddClient(supplierDetails._id)}  className='flex items-center p-2 bg-gray-400 uppercase rounded-lg'>Add Client
              </button>

            </div>


            <ProfileTable tableBody={clients}
            tableHeading={supplierProfileTable} column2='weight' 
            title="Supplier" column4='trip_payment' 
            column3='payments' path='/addSupplier' actionPath= '/clientProfile/'/>
  
          </div>
  
  
      </div>
  
   
      </div>
  
  
    )
  }

  

