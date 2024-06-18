import React from 'react'
import { SidebarData } from '../data/SidebarData'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {

    const activeLink = 'hover:bg-slate-300 bg-slate-300 flex text-center justify-start items-center text-white text-2xl max-lg:mt-0 space-x-2 max-lg:h-full max-lg:p-2 pl-3 w-full h-14 mt-7 font-bold rounded-lg '
    const normalLink = 'hover:bg-slate-300 flex text-center justify-start items-center text-white text-2xl space-x-2 pl-3 max-lg:mt-0 w-full max-lg:h-full max-lg:p-2 h-14 mt-7 font-bold rounded-lg'

  return (

    <React.Fragment>
  

        <div className='text-white w-full flex flex-col justify-between max-lg:flex-row max-md:items-center '>

            <div className='max-lg:flex max-lg:gap-2 max-lg:items-center max-lg:p-2 '>

                {
                
                    SidebarData.map((item,index)=>
                    {
                        return(
                            
                            <NavLink to={item.path} key={index} className={({isActive})=> isActive ? activeLink : normalLink}>

                                {/* <span>{item.icon}</span> */}
                                <span>{item.page}</span>

                            </NavLink>
                        )

                    }
                    )
                }

            </div>

            {/* <div className=' ' >
                <button className='bg-slate-300 rounded-lg cursor-pointer w-full p-2 mb-4 text-2xl m-0 font-bold '>
                    Logout
                </button>
            </div> */}

        </div>


    </React.Fragment>
  
  )
}
