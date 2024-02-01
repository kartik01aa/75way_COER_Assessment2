/// <reference types="react-scripts" />

type AppConfig = {
     baseUrl: string
 }
type User = 'logged-in' | 'logged-out'| 'registered'
interface counter {
    userStatus: User,
    name:string,
    authToken:string,
    refreshToken:string  
  }
interface Idriver {
    userStatus: User,
    name:string,
    authToken:string,
    refreshToken:string,
    status:boolean  
  }
  interface loginUser {

    email:string,
    password:string  
  }
  interface bookRide {
    isRequested: boolean,
    destination:string,
    driverId:string,
    customerName:string,
    isAccepted:boolean, 
  }