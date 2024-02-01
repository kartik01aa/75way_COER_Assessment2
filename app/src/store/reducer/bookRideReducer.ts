import { createSlice,PayloadAction } from "@reduxjs/toolkit";
   
   const initialState: bookRide = {
     isRequested: false,
     destination:'',
     driverId:'',
     customerName:'',
     isAccepted:false,  
   }
   
   const rideSlice = createSlice({
     name: 'ride',
     initialState,
     reducers: {
          rideBook:(state, action: PayloadAction<bookRide>) =>{
            state.isRequested = true;
            state.destination = action.payload.destination;
            state.driverId = action.payload.driverId;
            state.customerName = action.payload.customerName;
            state.isAccepted = false;
          
            return state;
            },
            rideCancel:(state) =>{
                state.isRequested = false;
                state.destination = '';
                state.driverId = '';
                state.customerName = '';
                state.isAccepted = false;
                return state;
           },
     },
   })
   
   export const {rideBook,rideCancel} = rideSlice.actions
   
   export default rideSlice.reducer