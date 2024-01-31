import { createSlice,PayloadAction } from "@reduxjs/toolkit";
   
   const initialState: counter = {
        userStatus:'logged-out',
       name:'',
       authToken:'',
       refreshToken:''
   }
   
   const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
          loginCustomer:(state, action: PayloadAction<counter>) =>{
            state.userStatus = 'logged-in';
            state.name = action.payload.name;
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
          
            return state;
            },
          loginDriver:(state, action: PayloadAction<counter>) =>{
            state.userStatus = 'logged-in';
            state.name = action.payload.name;
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
          
            return state;
            },
            logoutDriver:(state) =>{
                state.userStatus = 'logged-out';
                state.name = '';
                state.authToken = '';
                state.refreshToken = '';
                return state;
           },
            logoutCustomer:(state) =>{
                state.userStatus = 'logged-out';
                state.name = '';
                state.authToken = '';
                state.refreshToken = '';
                return state;
           },
     },
   })
   
   export const {logoutCustomer, logoutDriver,loginDriver,loginCustomer} = userSlice.actions
   
   export default userSlice.reducer