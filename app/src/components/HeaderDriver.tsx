import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/store'
import { loginDriver } from '../store/reducer/driverReducer'
import { useChangeDriverStatusMutation } from '../services/api'

const HeaderDriver = (props: any) => {
  const user = useAppSelector(state => state.driver)
  const storeDispatch = useAppDispatch()
  const [changeDriverStatus,{data,isSuccess}] = useChangeDriverStatusMutation()

  const handleStatus = async(e: any) => {
    e.preventDefault();
    const render = {
      userStatus: user.userStatus,
      name: user.name,
      authToken: user.authToken,
      refreshToken: user.refreshToken,
      status: !user.status
    }
    storeDispatch(loginDriver(render))
    localStorage.setItem('driverLogged', JSON.stringify(render))
    await changeDriverStatus({isActive:user.status, name:user.name})
  }



  return (
    <header className="text-gray-600 body-font bg-blue-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">My Ride</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-2xl hover:text-gray-900">Hi, {user.name}</a>
        </nav>

        <span onClick={handleStatus} className="inline-flex items-center cursor-pointer bg-green-200 border-0 py-1 px-3 mr-2 focus:outline-none  rounded text-base mt-4 md:mt-0">
          {user.status === true ? "Active" : "Inactive"}
        </span>
        <button onClick={props.handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Logout
        </button>
      </div>
    </header>
  )
}

export default HeaderDriver