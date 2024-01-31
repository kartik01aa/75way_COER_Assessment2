import React from 'react'
import { Link } from 'react-router-dom'

const LandingOption = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">DRIVER</h2>
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Become our Partner</h1>
              <p className="leading-relaxed mb-3">Join us as a cab driver</p>
              <Link to="/registerDriver" ><a className="text-indigo-500 flex justify-center items-center cursor-pointer ">Register
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a></Link>
              <Link to="/loginDriver" ><a className="text-indigo-500 flex justify-center items-center cursor-pointer ">Login
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a></Link>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CUSTOMER</h2>
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Looking for a cab</h1>
              <p className="leading-relaxed mb-3 ">Register as a customer</p>
              <Link to="/registerCustomer" ><a className="text-indigo-500 flex justify-center items-center  cursor-pointer">Register
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a></Link>
              <Link to="/loginCustomer" ><a className="text-indigo-500 flex justify-center items-center  cursor-pointer">Login
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingOption