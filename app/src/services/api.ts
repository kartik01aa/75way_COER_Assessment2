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
    getDriver: builder.query<void, void>({
      query: (user) => {
        return {
          url: "/driver/getDriver",
          method: "GET",
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
  useLazyLogoutCustomerQuery,
  useLazyGetDriverQuery,
} = api;
