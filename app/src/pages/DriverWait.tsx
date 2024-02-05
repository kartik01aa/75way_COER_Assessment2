import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useChangeCustomerStatusMutation, useGetCustomerDataMutation, useLazyRemoveApprovedRequestQuery } from '../services/api'

const DriverWait = () => {
  const location = useLocation()
  const [getCustomer, { data, isSuccess }] = useGetCustomerDataMutation()
  const [changeCustomerStatus] = useChangeCustomerStatusMutation()
  const [removeApprovedRequest] = useLazyRemoveApprovedRequestQuery()

  const temp = async () => {
    const driverData = await getCustomer({ name: location.state.name })
    console.log(location.state.name)
    console.log(driverData)
  }
  const handleClick = async () => {
    await changeCustomerStatus({ name: location.state.name, rideStatus: "start" })
  }
  const handleClick2 = async () => {
    await changeCustomerStatus({ name: location.state.name, rideStatus: "finish" })
    console.log(location.state.driverId)
    await removeApprovedRequest({ driverId: location.state.driverId })
  }
  useEffect(() => {
    temp()
    console.log(data)

  }, [])
  return (<>
    {isSuccess && (data.customer.rideStatus === "start") ? <>
      <div className='text-4xl flex justify-center h-60 items-center rounded-xl bg-blue-300 m-4 p-4'>
        <p>You have started the ride to customer destination.</p>
      </div>
      <button onClick={handleClick2} className='flex m-auto bg-black text-xl rounded-xl text-white p-2' >Finish Ride</button>
    </> :
      isSuccess && (data.customer.rideStatus === "finish") ? <>
        <div className='text-4xl flex justify-center h-60 items-center rounded-xl bg-blue-300 m-4 p-4'>
          <p>Ride Completed, Your ride earning will come at your account.</p>
        </div>
        <button onClick={handleClick2} className='flex m-auto bg-black text-xl rounded-xl text-white p-2' >Finish Ride</button>
      </>
        : <><div className='text-4xl flex justify-center h-60 items-center rounded-xl bg-blue-300 m-4 p-4' >
          <p>Reach customer location :</p>
          <p>{location.state.place}</p>
        </div>
          <button onClick={handleClick} className='flex m-auto bg-black text-xl rounded-xl text-white p-2' >Start Ride</button>
        </>}
    <p className='text-center py-2 text-grey-300'>Please reload to see changes.</p>
  </>)
}

export default DriverWait