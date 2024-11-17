import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://el-riyas.store/netflix' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login.php',
        method: 'POST',
        body: { ...credentials },
      }),
      //   prepareHeaders: (headers , {getState})=>{
      //     headers
      //   },
    }),
  }),
})
export const { useLoginMutation } = authApi
