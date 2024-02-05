import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    postRegisterDriver: builder.mutation<void, counter>({
      query: (user) => ({
        url: "/driver/registerDriver",
        method: "POST",
        body: user,
      }),
    }),
    postRegisterCustomer: builder.mutation<void, counter>({
      query: (user) => ({
        url: "/customer/registerCustomer",
        method: "POST",
        body: user,
      }),
    }),
    postLoginDriver: builder.mutation<JSON, loginUser>({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/driver/loginDriver",
          method: "POST",
          body,
        };
      },
    }),
    postLoginCustomer: builder.mutation<JSON, loginUser>({
      query: (user) => {
        return {
          url: "/customer/loginCustomer",
          method: "POST",
          body: user,
        };
      },
    }),
    logoutCustomer: builder.query<void, void>({
      query: () => `/customer/logoutCustomer`,
    }),
    logoutDriver: builder.query<void, void>({
      query: () => `/driver/logoutDriver`,
    }),
    getCustomerRequest: builder.query<void, any>({
      query: ({ id }) => `/driver/getCustomerRequest/${id}`,
    }),
    removeApprovedRequest: builder.query<void, any>({
      query: ({ driverId }) => `/driver/removeApprovedRequest/${driverId}`,
    }),
    updateCustomerLocation: builder.mutation<JSON, loginUser>({
      query: (user) => {
        return {
          url: "/customer/UpdateCustomer",
          method: "POST",
          body: user,
        };
      },
    }),
    updateDriverLocation: builder.mutation<JSON, loginUser>({
      query: (user) => {
        return {
          url: "/driver/UpdateDriver",
          method: "POST",
          body: user,
        };
      },
    }),
    changeDriverStatus: builder.mutation({
      query: (user) => {
        return {
          url: "/driver/changeDriverStatus",
          method: "POST",
          body: user,
        };
      },
    }),
    checkCustomerRequest: builder.mutation({
      query: (user) => {
        return {
          url: "/driver/requestForDriver",
          method: "POST",
          body: user,
        };
      },
    }),
    customerRequestAccepted: builder.mutation({
      query: (user) => {
        return {
          url: "/driver/customerRequestAccepted",
          method: "POST",
          body: user,
        };
      },
    }),
    changeCustomerStatus: builder.mutation({
      query: (user) => {
        return {
          url: "/customer/changeCustomerStatus",
          method: "POST",
          body: user,
        };
      },
    }),
    getDriver: builder.mutation<void, void>({
      query: (user) => {
        return {
          url: "/driver/getDriver",
          method: "POST",
          body: user,
        };
      },
    }),
    getCustomerData: builder.mutation<void, void>({
      query: (user) => {
        return {
          url: "/customer/getCustomerData",
          method: "POST",
          body: user,
        };
      },
    }),
    getCustomerHistory: builder.mutation<void, void>({
      query: (user) => {
        return {
          url: "/customer/getCustomerHistory",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const {
  usePostRegisterDriverMutation,
  usePostRegisterCustomerMutation,
  usePostLoginDriverMutation,
  usePostLoginCustomerMutation,
  useLazyLogoutDriverQuery,
  useLazyRemoveApprovedRequestQuery,
  useLazyGetCustomerRequestQuery,
  useGetCustomerDataMutation,
  useLazyLogoutCustomerQuery,
  useGetDriverMutation,
  useUpdateCustomerLocationMutation,
  useChangeDriverStatusMutation,
  useUpdateDriverLocationMutation,
  useCheckCustomerRequestMutation,
  useCustomerRequestAcceptedMutation,
  useChangeCustomerStatusMutation,
  useGetCustomerHistoryMutation,
} = api;
