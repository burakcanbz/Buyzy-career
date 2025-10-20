import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: process.env.NODE_ENV === 'production' ? BASE_URL : '',  credentials: 'include'})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['application', 'position', 'auth'],
    endpoints: (builder) => ({})
})