import { APP_URL, ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: ({ id }) => {
        return {
        url: `${ADMIN_URL}${APP_URL}/${id}`,
      }},
      keepUnusedDataFor: 5,
    }),
    getApplicationsByQuery: builder.query({
      query: ({ queryArr }) => ({
        url: `${ADMIN_URL}${APP_URL}/tabs?filter=${queryArr[0]}&name=${queryArr[1]}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getApplicationDetail: builder.query({
      query: (id) => ({
        url: `${ADMIN_URL}${APP_URL}/tabs/details/${id}`,
      }),
    }),
    postApplication: builder.mutation({
      query: (formData) => {
        return {
          url: `${ADMIN_URL}/application-form`,
          method: "POST",
          body: formData,
        };
      },
    }),
    updateHireStatus: builder.mutation({
      query: ({ message, id }) => {
        return {
          url: `${ADMIN_URL}/application-form/hire`,
          method: "PUT",
          body: { message, id },
        };
      },
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationsByQueryQuery,
  useGetApplicationDetailQuery,
  usePostApplicationMutation,
  useUpdateHireStatusMutation,
} = applicationApiSlice;
