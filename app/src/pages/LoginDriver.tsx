import react,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { loginDriver } from "../store/reducer/login";
import { usePostLoginDriverMutation } from "../services/api";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const LoginDriver = () => {
  const storeDispatch = useAppDispatch()
  const navigate = useNavigate()
  const [postLoginDriver,{data,isSuccess}] =  usePostLoginDriverMutation()
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    if(email){
      await postLoginDriver({email:email, password:password}).unwrap();
      navigate('/driverHome')
    }
    else{
      console.log("Email is undefined.")
    }
  };
  useEffect(()=>{
    if(isSuccess){
      const reducerData:counter = { 
        userStatus:"logged-in",
        name:data.existinguser.name,
        authToken:data.AccessToken,
        refreshToken:data.refereshToken,
      }
      storeDispatch(loginDriver(reducerData))
      localStorage.setItem('customerLogged',JSON.stringify(reducerData))
    }
  },[isSuccess])

  return (
    <><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Driver login
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e)=>setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={(e)=>setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
            Register as new user?{' '}
            <Link to="/registerDriver" ><a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </a></Link>
          </p>
    </div>
  </div></>
  )
}

export default LoginDriver