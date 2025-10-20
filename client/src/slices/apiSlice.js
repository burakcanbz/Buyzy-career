import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;

const baseQuery = fetchBaseQuery({baseUrl: process.env.NODE_ENV === 'production' ? 'https://buyzy-career.onrender.com' : '',  credentials: 'include'})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['application', 'position', 'auth'],
    endpoints: (builder) => ({})
})