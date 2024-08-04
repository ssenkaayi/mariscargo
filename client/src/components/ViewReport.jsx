
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

  const {tableHeading,tableData, reportDetails,title, column1,column2,column3,details1,details2,details3,detailsData1,detailsData2,month,year} = props
  const months = ['START','JANUARY','FEBUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST']
  
  return (

    <div className='grid grid-rows-11 p-2 gap-3 w-full h-full rounded-lg bg-slate-100'>

        <div ref={contentToPrint} className='centered row-span-10 bg-white p-2 rounded-lg '>

            <div className='mb-3 mt-2 text-xl'>
                
                <h1 className='text-center text-5xl m-4'><strong>MARIS CARGO LIMITED</strong></h1>
                <strong className='uppercase'>{title} REPORT FOR {months[month]} {year}</strong>


            </div>

            <div className='m-2 text-x flex gap-4'>

                <div className='flex  flex-col'>

                    <span className='w-50'>Total Weight:</span>
                    <span className='w-50'>Total  {details1}:</span>
                    <span className='w-50'>Total  {details2}:</span>
                    <span className='w-50'>Total No {details3}:</span>

                </div>

                <div className='flex  flex-col'>

                    <span>{reportDetails.totalWeight.toFixed(2)} kgs</span>
                    <span> $ {detailsData1}</span>
                    <span>{detailsData2} kgs</span>
                    {reportDetails.number}
                    
                </div>
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
