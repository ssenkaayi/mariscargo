import React from 'react'

export default function ViewReport(props) {

  const {tableHeading,tableData, reportDetails,title, column1,column2,column3} = props
//   console.log(reportDetails)
  return (
    
    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

        <div className='centered row-span-10 bg-white p-2 rounded-lg '>

            <div className='mb-3 mt-2 text-xl'>
                
                <p>{title}</p>
            </div>

            <div className='m-2 text-x '>
                <p className='flex gap-8'><span className='w-50'>Total Weight:</span><span>{reportDetails.totalWeight}</span></p >
                <p className='flex gap-8'><span className='w-50'> Total Expenses:</span><span>{reportDetails.totalExpense}</span></p >
                <p className='flex gap-8'><span className='w-50'> Total Trip Payments:</span><span>{reportDetails.totalTrip_Payment}</span></p >
                <p className='flex gap-8'><span className='w-50'>Total No Trips:</span><span></span>{reportDetails.number}</p >
            </div>

            <table className='w-full bordered hover mt-5'>

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

        <div  className='centered text-x row-span-1 bg-white p-2 rounded-lg '>
        
            <div>


                
            </div>
        </div>

    </div>
  )
}
