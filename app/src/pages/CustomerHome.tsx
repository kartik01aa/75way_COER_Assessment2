import Header from '../components/Header'
import {useState,useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useLazyGetDriverQuery, useLazyLogoutCustomerQuery } from '../services/api'
import { logoutCustomer } from '../store/reducer/login'
import CurrentLocation from '../components/CurrentLocation'
import { useNavigate } from 'react-router-dom'

const CustomerHome = () => {
const navigate = useNavigate()
const user = useAppSelector(state => state.user)
const storeDispatch = useAppDispatch()
const [logout] = useLazyLogoutCustomerQuery()
const handleLogout = async()=>{
     const returnData = await logout()
     console.log(returnData);
     console.log("User logged out successfully")
     localStorage.removeItem("userLogged")
     storeDispatch(logoutCustomer())
     navigate('/')    
}

const[dest,setDest] = useState('')
const[getDriver,{data,isSuccess}] = useLazyGetDriverQuery()
const handleSubmit = async(e:any)=>{
  e.preventDefault()
  console.log("hiii")
  await getDriver()
  
}
useEffect(()=>{
  if(isSuccess){
    console.log(data)
  }
},[dest])

  return (
    <>
    <Header handleLogout={handleLogout} user={user} />
    <CurrentLocation/>
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
              onChange={(e)=>setDest(e.target.value)}
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
        <div className="container px-5 py-16 w-1/2 mx-auto my-6 bg-blue-50 rounded-xl text-4xl text-center text-gray-300">
      {data ?
        <p>Driver List</p>:
        <p>Enter Destination</p>
      }
    </div>
    </>
  )
}

export default CustomerHome