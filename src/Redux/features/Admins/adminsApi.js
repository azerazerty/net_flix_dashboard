import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  tagTypes: ['SUBS'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://el-riyas.store/netflix/managesub.php' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: { ...credentials, action: 'get_subscriptions' },
      }),
      providesTags: ['SUBS'],
    }),
    createUser: builder.mutation({
      query: ({ credentials, User }) => ({
        url: '',
        method: 'POST',
        body: { ...credentials, ...User, action: 'create_subscription' },
      }),
      invalidatesTags: ['SUBS', 'HOME'],
    }),
    editUser: builder.mutation({
      query: ({ credentials, User }) => ({
        url: '',
        method: 'POST',
        body: { ...credentials, ...User, action: 'edit_subscription' },
      }),
      invalidatesTags: ['SUBS', 'HOME'],
    }),
    deleteUser: builder.mutation({
      query: ({ credentials, User }) => ({
        url: '',
        method: 'POST',
        body: { ...credentials, email: User.email, action: 'delete_subscription' },
      }),
      invalidatesTags: ['SUBS', 'HOME'],
    }),
  }),
})
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = adminsApi
