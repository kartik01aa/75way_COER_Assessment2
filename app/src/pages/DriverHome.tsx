import { useAppDispatch, useAppSelector } from '../store/store'
import { useState, useEffect } from 'react'
import { useCustomerRequestAcceptedMutation, useLazyGetCustomerRequestQuery, useLazyLogoutDriverQuery, useUpdateDriverLocationMutation } from '../services/api'
import { logoutDriver } from '../store/reducer/driverReducer'
import CurrentLocation from '../components/CurrentLocation'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderDriver from '../components/HeaderDriver'
import { rideBook, rideCancel } from '../store/reducer/bookRideReducer'

const DriverHome = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(state => state.driver)
  const ride = useAppSelector(state => state.ride)

  const storeDispatch = useAppDispatch()
  const [logout] = useLazyLogoutDriverQuery()
  const [updateDriver] = useUpdateDriverLocationMutation()
  const [customerRequestAccepted] = useCustomerRequestAcceptedMutation()
  const [getCustomerRequest,{data, isSuccess}] = useLazyGetCustomerRequestQuery()

  const handleLogout = async () => {
    const returnData = await logout()
    console.log(returnData);
    console.log("User logged out successfully")
    localStorage.removeItem("userLogged")
    storeDispatch(logoutDriver())
    storeDispatch(rideCancel())
    localStorage.removeItem("rideDetails")
    navigate('/')
  }

  const handleIt = async (l: any) => {
    if (location.state.id && user.status === true) {
      console.log("yay", user.status)
      const up = await updateDriver({ location: l, id: location.state.id })
    }
  }
  const handleAccept = async(e: any) => {
    e.preventDefault()
    const rideDetails: bookRide = {
      isRequested: ride.isRequested,
      destination: ride.destination,
      driverId: ride.driverId,
      customerName: ride.customerName,
      isAccepted: true,
    }
  
    storeDispatch(rideBook(rideDetails))
    localStorage.setItem('rideDetails', JSON.stringify(rideDetails))
    console.log(data.driver.requests[0].location)
    console.log(data.driver.requests[0].customerId)
    await customerRequestAccepted({location:data.driver.requests[0].location, customerId:data.driver.requests[0].customerId ,driverId: location.state.id})
    navigate('/driverWait',{ state: { place: data.driver.requests[0].location} })
  }

  const runn = async()=>{
    const d = await getCustomerRequest({id:location.state.id})
    console.log("start")
    console.log(d.driver)
  }
  useEffect(() => {
    runn()
    
  }, [])

  return (
    <>
      <HeaderDriver handleLogout={handleLogout} user={user} />
      {user.status === true ? <CurrentLocation handleIt={handleIt} /> : ""}
      <div className="container px-5 py-24 w-1/2 mx-auto my-6 bg-blue-50 rounded-xl text-4xl text-center text-gray-300">
        {
           isSuccess ?
           data.driver.requests.map((d:any)=>{
              return <div className='flex justify-around p-4 text-2xl rounded-xl text-black border'>
              <p>{d.customerId}</p>
              <p>{d.location}</p>
              <button onClick={handleAccept} className='bg-blue-500 rounded-xl py-1 px-3'>Yes</button>
              <button className='bg-blue-500 rounded-xl py-1 px-3'>No</button>
            </div>
           })
             :
            <p>No Request Yet</p>
        }
      </div>
    </>
  )
}

export default DriverHome