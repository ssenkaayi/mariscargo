import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function PrivateRoutes() {

  const {currentEmploye} = useSelector(state => state.employe)
  // console.log(currentEmploye)
  
  return (
    currentEmploye ? <Outlet/>:<Navigate to="/login"/>
  )
}
