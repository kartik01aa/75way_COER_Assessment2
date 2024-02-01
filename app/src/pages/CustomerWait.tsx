import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import { useAppSelector } from '../store/store'

const CustomerWait = () => {
  const ride = useAppSelector(state => state.ride)
  return (
    <>{
      ride.isAccepted === true ? <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
        <p className='p-4 text-center '>Driver has accepted your drive, will reach in few minutes.</p>
      </div>
        : <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
          <p className='p-4 text-center'>Request is Sent to driver.</p>
          <p className='p-4 text-center '>Please wait for driver to accept your request</p>
        </div>}
    </>
  )
}

export default CustomerWait