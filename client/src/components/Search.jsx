import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteModel from './DeleteModel';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import {CiSearch } from 'react-icons/ci'

export default function Search(props) {

  const{tableDataApi,tableHeading,title,column2,column3,column4,path,actionPath,deleteApi,editPath,} = props

  const[tableData, updateTableData] = useState([])
  const [loading,setLoading] = useState(false);
  const[error, setError] = useState(null)
  const[showDeleteModel,setShowDeleteModel]= useState(false)
  const[deleteDataApi,setDeleteDataApi]=useState('')
  const[id,setId] = useState('')
  const [limit,setLimit] = useState(13)
  const [pageCount,setPageCount] = useState(1)
  const currentPage = useRef()
  const [searchItem, setSearchItem] = useState('')

  useEffect(()=>{
    currentPage.current = 1
    fetchClient()

  },[])

  const handleInputChange = (e) => { 

    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    
  }

  const fetchClient = async()=>{

    const path = tableDataApi+`?page=${currentPage.current}&limit=${limit}`
    // console.log(path)

    try{

      const res = await fetch(path,{
        method:'GET',
      })
  
      const data = await res.json()
      // console.log(data)

      if(data.success===false){

        window.localStorage.clear()
        window.location.href = './login'
        // console.log(data.message)
        alert('token expired login again')

        return
      }

      if(data.message === 'token expired'){
        
        window.localStorage.clear()
        window.location.href = './login'
        alert('token expired login again')

      }
      setPageCount(data.pageCount)

      updateTableData(data.result)

    }catch(error){
      console.log(error)
    }

  }

  const handlePageClick = (e)=>{
    // console.log(e)
    currentPage.current = (e.selected+1)
    fetchClient()

  }
  
  const navigate = useNavigate()

  const handleModify = (id)=>{

    const route = actionPath + id
    // console.log(route)

    navigate(route)
  }

  const handleCloseDeleteModel = ()=>{

    setShowDeleteModel(false)

  }

  const comfirmDelete = async()=>{

    console.log(deleteDataApi)

      try{
  
      const res = await fetch(deleteDataApi,{
        method:"DELETE",
      })
  
      const data = await res.json();
  
      // console.log(data)
  
      if(data.success===false){
        alert('deleting failed')
        return console.log(data.message)
        setError(data.message)
        setLoading(false)
      }
      setShowDeleteModel(false)
      updateTableData((prev)=>prev.filter((client)=>client._id!==id))
      alert('data deleted successfully')

    }catch(error){
      console.log(error)
      setError(error.message)
    }

    // navigate(path)

  }

  const handleDelete = async(id)=>{

    const route = deleteApi + id
    setId(id)
    // console.log(route)
    setDeleteDataApi(route)
    setShowDeleteModel(true)
 
  }

  const handleEdit = (id)=>{

    // console.log(editPath)
    const route = editPath + id
    
    navigate(route)
 
  }

  const handleSearch = ()=>{
    navigate('/search')
  }

  return (

    <div className='grid grid-rows-11 p-2 gap-3 h-full w-full' >
      
      < DeleteModel visible={showDeleteModel} comfirmDelete={comfirmDelete} onClose={handleCloseDeleteModel} />

      <div className='centered text-2xl row-span-1 bg-white p-2 rounded-lg flex justify-between items-center'>
        
        <div>

          Manage Search 
          
        </div>

        <div className='flex justify-between gap-4 items-center centered'>

          <div className='flex items-center p-search-box bg-search-bar rounded-2xl '>

            <CiSearch className='w-6 h-6 cursor-pointer text-sm hover:trb m-2' onClick={handleSearch} />
            < input className='bg-transparent p-2 outline-none' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />

          </div>

          <div className='bg-slate-300 rounded-lg p-1'>
            <button className='cursor-pointer m-1 uppercase' onClick={()=>{navigate(path)}}>Search</button>
          
          </div>

        </div>

      </div>

      <div className='centered text-xl row-span-9 bg-white p-2 rounded-lg'>

        <table className='w-full table-auto striped bordered hover'>

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

            {tableData.length>0?tableData.map((client,index)=>{

              return(  
                
                <tr className='text-center ' key={client._id}>

                  <td className='p-2'>{client.date.length>0?client.date.split("T",1):"no date"}</td>
                  <td >{client.name}</td>
                  <td >{client[column2]}</td>
                  <td >{client[column3]}</td>
                  <td >{client[column4]}</td>
                
                  <td className='items-left'>

                    <div className='flex gap-2 text-sm flex-row'>

                      <span onClick={()=>handleEdit(client._id)} className='cursor-pointer bg-green-600 p-2 rounded-lg'>  EDIT</span>
                      <span onClick={()=>handleModify(client._id)} className='cursor-pointer bg-slate-200 p-2 rounded-lg'> MODIFY</span>
                      <span onClick={()=>handleDelete(client._id)} className='cursor-pointer bg-red-600 p-2 rounded-lg'>DELETE</span>
           
                    </div>

                  </td>

                </tr>                  

              )
            }):<tr className='text-center'>

              <td className='text-center'>{loading} not available </td>

            </tr>}

          </tbody>

        </table>

      </div>

      <div className='centered text-2xl row-span-1 bg-white p-2 rounded-lg flex justify-between'>

      <ReactPaginate className="flex gap-4"

        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}


      />

      </div>

    </div>
  )
}


