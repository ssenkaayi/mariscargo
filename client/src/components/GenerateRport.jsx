import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function GenerateRport(props) {

    const{heading, reportApi} = props

    const[reportData, setReportData] = useState([])
    const [loading,setLoading] = useState(false);
    const[error, setError] = useState(null)
    const[formData,setFormData] = useState({})

    const navigate = useNavigate();
  
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });

    };
  
    //linking our api to send req to the server
    const handleSubmit = async(e)=>{
 
      setLoading(true);
      e.preventDefault();

      try{
        //making a request to the server
        const report = reportApi+formData.year+'/'+formData.month
        // console.log(report)-

        const res = await fetch(report,{
          method:'GET',
        }
        );
        //getting response from the server
        const data =  await res.json();
        console.log(data)
  
        //if response is false, show the error message to the client
        if(data.success===false){
          setLoading(false);
          setError(data.message);
          return
        }
  
        //if response is True, register and navigate to the sign in page
        setLoading(false);
        setError(null)
        setReportData(data)
       
        navigate('/')
  
      }catch(error){
        setLoading(false);
        setError(error.message);
  
      } 
    }

    // console.log(reportData)

  return (

    <form onSubmit={handleSubmit}>

      <div className='bg-slate-200 rounded-xl p-4 flex flex-col gap-4 w-80 h-96'>

        <h1 className='text-2xl font-semibold text-center mt-2 mb-2'> {heading}</h1>

        <label className='text-1xl '>Select Month</label>
        <input type="number" onChange={handleChange} placeholder="Select Month" id='month' className='border p-3 rounded-lg'
        required 
        />

        <label className='text-1xl '>Select Year</label>
        <input type="number" onChange={handleChange} placeholder="Select Year" id='year'  className='border p-3 rounded-lg'
        required 
        />

        <button className='text-1xl font-semibold rounded-lg border bg-slate-300 p-3 mt-2'>Generate Report</button>

      </div>

    </form>

    


  )
}
