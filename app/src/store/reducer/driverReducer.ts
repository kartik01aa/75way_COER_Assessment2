import { createSlice,PayloadAction } from "@reduxjs/toolkit";
   
   const initialState: Idriver = {
        userStatus:'logged-out',
       name:'',
       authToken:'',
       refreshToken:'',
       status:false,
   }
   
   const driverSlice = createSlice({
     name: 'driver',
     initialState,
     reducers: {
          loginDriver:(state, action: PayloadAction<Idriver>) =>{
            state.userStatus = 'logged-in';
            state.name = action.payload.name;
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
            state.status = action.payload.status;
          
            return state;
            },
            logoutDriver:(state) =>{
                state.userStatus = 'logged-out';
                state.name = '';
                state.authToken = '';
                state.refreshToken = '';
                state.status = false;
                return state;
           },
           
     },
   })
   
   export const {logoutDriver,loginDriver} = driverSlice.actions
   
   export default driverSlice.reducer