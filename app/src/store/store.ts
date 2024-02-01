import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { api } from "../services/api";
import userReducer from './reducer/customerReducer'
import driverReducer from "./reducer/driverReducer";
import bookReducer from "./reducer/bookRideReducer";

export const store = configureStore({
     reducer:{
        user:userReducer,
        driver:driverReducer,
        ride:bookReducer,
          [api.reducerPath]: api.reducer,
  },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(api.middleware),
     
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector