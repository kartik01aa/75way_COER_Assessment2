import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetCustomerDataMutation } from '../services/api'

const RideHistory = () => {
     const location = useLocation()
     const [getCustomer,{data,isSuccess}] = useGetCustomerDataMutation()
     const runn = async()=>{
          const customerdata = await getCustomer({name:location.state.name})
          console.log(customerdata)
     }
     useEffect(()=>{
          runn();
     },[])
  return (
    <div className='text-3xl text-white flex flex-col justify-center items-center rounded-xl bg-blue-300 m-4 p-4'>
          { isSuccess ? data.customer.rideHistory.map((d:any)=>{
               return <><p>Customer name :- {d.name}</p>
               <p>Driver ID :- {d.driverId}</p>
               <p className='pb-6' >Destination :- {d.dest}</p></> 
          })
     :
     <div>Loading...</div>}
    </div>
  )
}

export default RideHistory