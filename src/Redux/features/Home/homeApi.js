import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
  reducerPath: 'homeApi',
  tagTypes: ['USERS'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://el-riyas.store/netflix' }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    home: builder.query({
      query: (credentials) => ({
        url: '/home.php',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
})
export const { useHomeQuery } = homeApi
