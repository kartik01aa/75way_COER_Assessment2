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
  interface loginUser {

    email:string,
    password:string  
  }