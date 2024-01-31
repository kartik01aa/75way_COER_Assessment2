import react,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { usePostRegisterDriverMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterDriver = () => {
  const navigate = useNavigate()
  const [postRegisterDriver,{isSuccess}] =  usePostRegisterDriverMutation()

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[location,setLocation] = useState("")
  const[vehicleType,setVehicleType] = useState("")

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    if(name){
      await postRegisterDriver({name:name,email:email, password:password,location:location,vehicleType:vehicleType}).unwrap();
      navigate('/loginDriver')
    }
    else{
      console.log("Email is undefined.")
    }
  };
  useEffect(()=>{
    if(isSuccess){
      console.log("User registered successfully ")
  
    }
  },[isSuccess])

  return (
    <><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register as certified Driver
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}  action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              onChange={(e)=>setName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
            Location
          </label>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="location"
              autoComplete="location"
              required
              onChange={(e)=>setLocation(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
          <div className="flex items-center justify-between">
            <label htmlFor="vehicleType" className="block text-sm font-medium leading-6 text-gray-900">
              Vehicle Type
            </label>
          </div>
          <div className="mt-2">
            <input
              id="vehicleType"
              placeholder='only write "two-wheel | four-wheel" '
              name="vehicleType"
              type="vehicleType"
              autoComplete="vehicleType"
              required
              onChange={(e)=>setVehicleType(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
            Already had a account?{' '}
            <Link to="/LoginDriver" ><a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </a></Link>
          </p>
    </div>
  </div></>
  )

}

export default RegisterDriver