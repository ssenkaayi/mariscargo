import React from 'react'

export default function ViewReport(props) {

  const {tableHeading,tableData, title, column1,column2,column3} = props
  return (
    
    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

        <div className='centered text-xl row-span-3 bg-white p-2 rounded-lg '>

            <div className='mb-3 mt-2'>
                
                <p>{title}</p>
            </div>

            <div className='m-2'>
                <p className='flex gap-8'><span className='w-50'>Total Weight:</span><span></span></p >
                <p className='flex gap-8'><span className='w-50'> Total Expenses:</span><span></span></p >
                <p className='flex gap-8'><span className='w-50'> Total Trip Payments:</span><span></span></p >
                <p className='flex gap-8'><span className='w-50'>ID No:</span><span></span></p >
            </div>

        </div>

        <div  className='centered text-x row-span-8 bg-white p-2 rounded-lg '>
        
            <div>

                <table className='w-full bordered hover'>

                    <thead className='bg-slate-300'>

                        <tr>

                        {tableHeading.map((item,index)=>{

                            return(                    
                            <th className='p-2 text-center'key={index}>{item}</th>

                            )
                        })}

                        </tr>

                    </thead >

                    <tbody className='p-1'>

                        {tableData.length>0?tableData.map((client,index)=>{

                        return(  
                            
                            <tr className='text-center ' key={client._id}>

                            <td className='p-2'>{client.date.length>0?client.date.split("T",1):"no date"}</td>
                            <td >{client.name}</td>
                            <td >{client[column1]}</td>
                            <td >{client[column2]}</td>
                            <td >{client[column3]}</td>

                            </tr>                  

                        )
                        }):<tr className='text-center'>

                        <td className='text-center'>{title} not available </td>

                        </tr>}

                    </tbody>

                </table>
                
            </div>
        </div>
    </div>
  )
}
