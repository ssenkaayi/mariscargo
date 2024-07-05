import React from 'react'

export default function DeleteModel({visible ,onClose,comfirmDelete}) {
    
   const handleOnClose = ()=>{ 
    
    onClose()
  
  }

  const handleDeleteRecord=()=>{

    comfirmDelete()
  }

   if(!visible) return null;

  return (

    <div className='fixed inset-0 flex flex-col gap-8 justify-center items-center'>

      <p> are you sure you want to delete record</p>

      <div className=' gap-4 flex '>
        
        <button onClick={handleOnClose} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        type="button"> no
        </button>

        <button onClick={handleDeleteRecord} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        > yes
        </button>

      </div>  

    </div>

  )
}
