
import React from 'react'
import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function ViewReport(props) {

  
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

  const {tableHeading,tableData, reportDetails,title, column1,column2,column3,details1,details2,details3,detailsData1,detailsData2} = props
//   console.log(reportDetails)
  return (

    
    
    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

        <div ref={contentToPrint} className='centered row-span-10 bg-white p-2 rounded-lg '>

            <div className='mb-3 mt-2 text-xl'>
                
                <p>{title}</p>
            </div>

            <div className='m-2 text-x '>
                <p className='flex gap-8'><span className='w-50'>Weight:</span><span>{reportDetails.totalWeight.toFixed(2)}</span></p >
                <p className='flex gap-8'><span className='w-50'> {details1}:</span><span>{detailsData1}</span></p >
                <p className='flex gap-8'><span className='w-50'> {details2}:</span><span>{detailsData2}</span></p >
                <p className='flex gap-8'><span className='w-50'>No {details3}:</span><span></span>{reportDetails.number}</p >
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

                <tbody className='p-1 first-letter:'>

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


                <button className='flex text-sm items-center p-2 ml-8 bg-gray-400 rounded-lg' onClick={() => {

                    handlePrint(null, () => contentToPrint.current);
                }}>
                    PRINT
                </button>


                
            </div>
        </div>

    </div>
  )
}
