import React from 'react'
import LandingOption from '../components/LandingOption'

const Home = () => {
  return (
    <div>
      <div className="container px-5 pt-12 pb-6 mx-auto text-gray-600 body-font text-center ">
        <h1 className="text-3xl" >Welcome, to My Ride landing page</h1>
      </div>
      <LandingOption/>
    </div>
  )
}

export default Home