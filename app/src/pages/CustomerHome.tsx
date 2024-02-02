import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useChangeCustomerStatusMutation, useCheckCustomerRequestMutation, useGetDriverMutation, useLazyLogoutCustomerQuery, useUpdateCustomerLocationMutation } from '../services/api'
import { logoutCustomer } from '../store/reducer/customerReducer'
import CurrentLocation from '../components/CurrentLocation'
import { useLocation, useNavigate } from 'react-router-dom'
import { rideBook, rideCancel } from '../store/reducer/bookRideReducer'

const CustomerHome = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user)
  const storeDispatch = useAppDispatch()
  const [logout] = useLazyLogoutCustomerQuery()
  const handleLogout = async () => {
    const returnData = await logout()
    console.log(returnData);
    console.log("User logged out successfully")
    localStorage.removeItem("userLogged")
    storeDispatch(logoutCustomer())
    storeDispatch(rideCancel())
    localStorage.removeItem("rideDetails")
    navigate('/')
  }

  const [dest, setDest] = useState('')
  const [getDriver, { data, isSuccess }] = useGetDriverMutation()
  const location = useLocation();
  const [updateCustomer] = useUpdateCustomerLocationMutation()
  const [customerRequest] = useCheckCustomerRequestMutation()
  const[changeCustomerStatus] = useChangeCustomerStatusMutation()
  const [cusLocation, setCusLocation] = useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log("hiii")
    await getDriver({ location: cusLocation })

  }
  const handleIt = async (l: any) => {
    if (location.state.id) {
      console.log("yay", location.state.id)
      setCusLocation(l)
      const up = await updateCustomer({ location: l, id: location.state.id })
    }
  }

  const handleBookRide = async(e: any, name: any, driverId:any) => {
    e.preventDefault()
    const rideDetails: bookRide = {
      isRequested: true,
      destination: dest,
      driverId: name,
      customerName: user.name,
      isAccepted: false,
    }
    storeDispatch(rideBook(rideDetails))
    localStorage.setItem('rideDetails', JSON.stringify(rideDetails))
    console.log(dest,user.name,driverId)
    await customerRequest({location:dest, customerId:user.name, driverId:driverId})
    await changeCustomerStatus({name:user.name ,rideStatus:"waiting"})
    navigate('/customerWait')
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(location.state.id)
      console.log(data)
    }
  }, [isSuccess])

  return (
    <>
      <Header handleLogout={handleLogout} user={user} />
      <CurrentLocation handleIt={handleIt} />
      <form className="space-y-6 mt-8 flex justify-center" onSubmit={handleSubmit} action="#" method="POST">

        <div >
          <label htmlFor="dest" className=" text-center text-md font-medium leading-6 text-gray-900">
            Enter Destination
          </label>
          <div className="mt-2">
            <input
              id="dest"
              name="dest"
              type="dest"
              autoComplete="email"
              required
              onChange={(e) => setDest(e.target.value)}
              className=" w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex w-10 justify-center rounded-md bg-indigo-600 ml-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          GO
        </button>
      </form>

      <div className="container px-5 py-8 w-1/2 mx-auto my-6 bg-blue-50 rounded-xl text-center">
        {isSuccess ? <>
          <h2 className="border border-4 text-5xl text-blue-300" >Available Drivers</h2>

          {data.map((d: any) => {
            return <div className='border-b flex justify-between text-gray-700 text-2xl'>
              <p key={d.name} className='p-4 ' >{d.name}</p>
              <p className='p-4 '>{d.vehicleType}</p>
              <button onClick={(e) => handleBookRide(e, d.name, d._id)} className='m-4 w-auto rounded-md bg-black ml-4 px-3  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>Book Ride</button>
            </div>
          })}</>
          :
          <p className='text-gray-300 text-4xl'>Enter Destination</p>
        }
      </div>
    </>
  )
}

export default CustomerHome