import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProfileTable(props) {

  const{tableBody,tableHeading,title,column2,column3,column4,path,actionPath} = props

  const navigate = useNavigate()

  const handleModify = (id)=>{

    const route = actionPath + id
    // console.log(route)

    navigate(route)
  }

  return (

    <table className='w-full table-auto'>

        <thead className='bg-slate-300'>

            <tr>

                {tableHeading.map((item,index)=>{

                return(                    
                <th className='p-2 text-center'key={index}>{item}</th>

                )
                })}

                <th className='text-left '>Actions</th>
            </tr>

        </thead >

        <tbody className='p-2'>

            {tableBody.length>0?tableBody.map((client,index)=>{

                return(  
                
                    <tr className='text-center ' key={client._id}>

                        <td className='p-2'>{client.date.length>0?client.date.split("T",1):"no date"}</td>
                        <td >{client.name}</td>
                        <td >{client[column2]}</td>
                        <td >{client[column3]}</td>
                        <td >{client[column4]}</td>
                    
                        <td className='items-left'>

                        <div className='flex gap-2 text-sm flex-row'>

                            <span className='cursor-pointer bg-green-600 p-2 rounded-lg'>  EDIT</span>
                            <span onClick={()=>handleModify(client._id)} className='cursor-pointer bg-slate-200 p-2 rounded-lg'> MODIFY</span>
                            <span className='cursor-pointer bg-red-600 p-2 rounded-lg'>DELETE</span>
                
                        </div>

                        </td>

                    </tr>                  

                )
                }):<tr className='text-center'>

                <td className='text-center'>{title} not available </td>

            </tr>}

        </tbody>

    </table>
  )
}
