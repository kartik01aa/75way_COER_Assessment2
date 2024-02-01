import React from 'react'
import { useAppSelector } from '../store/store'

const DriverWait = () => {
  const ride = useAppSelector(state => state.ride)
  return (
    <div className='text-4xl flex justify-center h-60 items-center rounded-xl bg-blue-300 m-4 p-4' >
      <p>Reach customer location : </p>
      <p>{ride.destination}</p>
    </div>
  )
}

export default DriverWait