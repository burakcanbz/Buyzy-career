import { POSITIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const positionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobItems: builder.query({
      query: () => ({
        url: `${POSITIONS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getJobItemDetail: builder.query({
      query: (id) => ({
        url: `${POSITIONS_URL}/${id}`,
      }),
    }),
    getPositionWithPage: builder.query({
      query: ({ page, limit }) => {
        return{
        url: `${POSITIONS_URL}/positions?page=${page}&limit=${limit}`,
      }},
      keepUnusedDataFor: 5,
    }),
    postPosition: builder.mutation({
      query: ({ formData }) => ({
        url: `${POSITIONS_URL}/add-position?folder=client`,
        method: "POST",
        body: formData,
      }),
    }),
    updatePosition: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${POSITIONS_URL}/update-position/${id}?folder=client`,
        method: "PUT",
        body: formData,
      }),
    }),
    deletePosition: builder.mutation({
      query: ({ id }) => ({
        url: `${POSITIONS_URL}/${id}`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetJobItemsQuery,
  useGetJobItemDetailQuery,
  useGetPositionWithPageQuery,
  usePostPositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = positionApiSlice;
