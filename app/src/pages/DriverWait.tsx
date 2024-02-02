import React from 'react'
import { useAppSelector } from '../store/store'
import { useLocation } from 'react-router-dom'

const DriverWait = () => {
  const ride = useAppSelector(state => state.ride)
  const location = useLocation()
  return (<>
    <div className='text-4xl flex justify-center h-60 items-center rounded-xl bg-blue-300 m-4 p-4' >
      <p>Reach customer location :</p>
      <p>{location.state.place}</p>
    </div>
    <button className='flex m-auto bg-black text-xl rounded-xl text-white p-2' >Start Ride</button>
    </>)
}

export default DriverWait