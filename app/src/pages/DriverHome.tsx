import Header from '../components/Header'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useLazyLogoutDriverQuery } from '../services/api'
import { logoutDriver } from '../store/reducer/login'
import CurrentLocation from '../components/CurrentLocation'
import { useNavigate } from 'react-router-dom'

const DriverHome = () => {
const navigate = useNavigate()
const user = useAppSelector(state => state.user)
const storeDispatch = useAppDispatch()
const [logout] = useLazyLogoutDriverQuery()
const handleLogout = async()=>{
     const returnData = await logout()
     console.log(returnData);
     console.log("User logged out successfully")
     localStorage.removeItem("userLogged")
     storeDispatch(logoutDriver())
     navigate('/')    
}

  return (
    <>
    <Header handleLogout={handleLogout} user={user} />
    <CurrentLocation/>
    <div className="container px-5 py-24 w-1/2 mx-auto my-6 bg-blue-50 rounded-xl text-4xl text-center text-gray-300">
      No Request Yet
    </div>
    </>
  )
}

export default DriverHome