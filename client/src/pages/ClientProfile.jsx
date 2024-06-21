import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { supplierProfileTable } from '../data/TableHeading';
import ProfileTable from '../components/ProfileTable';
import { clientProfileDeliveryTable,clientProfilePaymentTable } from '../data/TableHeading';

export default function ClientProfile(props) {

  const {actionPath1} = props

  const params = useParams() 
  const client_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientDetails,setClientDetails]=useState([]) 
  const navigate = useNavigate()
  const [payments , setPayments] = useState([])
  const [deliveries , setDeliveries] = useState([])



  const handlePrint =()=>{
      window.print()
    }

    const goBackClient = ()=>{
      navigate(`/clients`)
    }


    useEffect(()=>{


      fetchSupplier()
    
    },[])
    
    const fetchSupplier = async()=>{
  
      try{
    
        setLoading(true);
        const res = await fetch(`/api/client/${client_id}`,{
          
          method:'GET',
        
        })
    
        const data = await res.json();
        // setSuppliers(data)
        setClientDetails(data.getClient)
        setDeliveries(data.deliveries)
        setPayments(data.payments)
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

    const handleModifyClient = (id)=>{

      console.log(actionPath1)

      const route = '/clientProfile/' + id
      // console.log(route)
  
      navigate(route)
    }

    const handleAddDelivery = (id)=>{

      navigate('/addDeliveries/'+id)
    }

    const handleAddPayment = (id)=>{

      navigate('/addPayment/'+id)
    }

  return (
   

      <div className='grid grid-rows-11 p-2 gap-2 w-full h-full rounded-lg bg-slate-100'>
  
        <div className='centered text-xl row-span-3 bg-white p-2 rounded-lg '>
  
          <div className='flex mb-2 mt-2 justify-between'>
              
              <p>CLIENT DATA</p>
              <button 
                onClick={()=>handlePrint()}  className='flex text-sm items-center p-2 ml-8 bg-gray-400 rounded-lg'>PRINT
              </button>
          </div>
  
                 
            <div className='m-2'>
              <p className='flex gap-8'><span className='w-20'> Weight:</span><span>{clientDetails.weight} kgs</span></p >
              <p className='flex gap-8'><span className='w-20'> Client:</span><span>{clientDetails.name}</span></p >
              <p className='flex gap-8'><span className='w-20'>Deliveries:</span><span>{clientDetails.deliveries} kgs</span></p >
              <p className='flex gap-8'><span className='w-20'> Payments:</span><span>$ {clientDetails.payments}</span></p >
              <p className='flex gap-8'><span className='w-20'> No.Pieces:</span><span>{clientDetails.no_pieces}</span></p >

            </div>

          </div>
  
        <div  className='centered text-xl row-span-4 bg-white p-2 rounded-lg '>

          <div className='flex m-2 justify-between'>
            
            <h3 className='text-xl uppercase'> <strong>Deliveries  </strong></h3>

            <button 
              onClick={()=>handleAddDelivery(clientDetails._id)}  className='flex text-sm items-center p-2 bg-gray-400 rounded-lg'>ADD DELIVERY
            </button>

          </div>
          
          <ProfileTable tableBody={deliveries}
            tableHeading={clientProfileDeliveryTable} column2='weight' 
            title="Supplier" column4='deliverer' 
            column3='no_pieces' path='/addSupplier' actionPath= '/clientProfile/'/>
  
        </div>

        <div  className='centered text-xl row-span-4 bg-white p-2 rounded-lg '>
          
          <div>
              
            <div className='flex m-2 justify-between'>
  
              <h3 className=' text-xl uppercase'> <strong>Payments </strong></h3>
  
              <button 
                onClick={()=>handleAddPayment(clientDetails._id)}  className='flex text-sm items-center p-2 bg-gray-400 rounded-lg'>ADD PAYMENT
              </button>

            </div>
  
            <ProfileTable tableBody={payments}
            tableHeading={clientProfilePaymentTable} column2='recieptNo' 
            title="Supplier" column4='amount' 
            column3='kg_rate' path='/addSupplier' actionPath= '/clientProfile/'/>
  
          </div>
        </div>  
  
   
      </div>

    )
  }
  
