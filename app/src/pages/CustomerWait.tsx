import { useEffect, useState } from 'react'
import { useChangeCustomerStatusMutation, useGetCustomerDataMutation, useGetCustomerHistoryMutation } from '../services/api'
import { useLocation, useNavigate } from 'react-router-dom'

const CustomerWait = () => {
  const [getCustomer, { data, isSuccess }] = useGetCustomerDataMutation()
  const [getCustomerHistory] = useGetCustomerHistoryMutation()
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state.name)
  const [click, setClick] = useState(false)
  const [changeCustomerStatus] = useChangeCustomerStatusMutation()

  const handleHistory = async () => {
    const historyData = await getCustomerHistory({ name: location.state.name, dest: location.state.dest, driverId: location.state.driverId })
    await changeCustomerStatus({ name: location.state.name, rideStatus: "idle" })
    navigate("/rideHistory", { state: { name: location.state.name } })
  }

  const temp = async () => {
    const driverData = await getCustomer({ name: location.state.name })
    console.log(location.state.name)
    console.log(driverData)
  }
  useEffect(() => {
    temp()
    console.log(data)

  }, [click])

  return (
    <>
      {isSuccess && (data.customer.rideStatus === "approved") ? <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
        <p className='p-4 text-center '>Driver has accepted your drive, will reach in few minutes.</p>
      </div> :
        isSuccess && (data.customer.rideStatus === "start") ?
          <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
            <p className='p-4 text-center '>Your ride has been started. Enjoy your ride.</p>
          </div> :
          isSuccess && (data.customer.rideStatus === "finish") ? <>
            <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
              <p className='p-4 text-center '>Your ride has ended.Hope, you enjoy your ride.</p>
              <p className='p-4 text-center '>Do share your ride experience with us.</p>
            </div>
            <button onClick={handleHistory} className='bg-black p-2 m-2   rounded-xl flex mx-auto text-white text-2xl'>Check Ride History</button>
          </>
            : <div className='text-2xl items-center justify-center rounded-xl bg-blue-100 flex-col m-8'>
              <p className='p-4 text-center'>Request is Sent to driver.</p>
              <p className='p-4 text-center '>Please wait for driver to accept your request</p>
            </div>}
      <button onClick={() => setClick(!click)} className='bg-black p-2 rounded-xl flex mx-auto text-white text-2xl' >Check update</button>
    </>
  )
}

export default CustomerWait