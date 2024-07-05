import React from 'react'
import { useParams } from 'react-router-dom'

export default function ViewReport() {
        const params = useParams() 
        const year = params.year
        console.log(year)
  return (
    <div>ViewReport</div>
  )
}
