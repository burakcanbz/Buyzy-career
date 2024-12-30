import { apiSlice } from "./apiSlice";
import { FEEDBACK_URL } from "../constants";

const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    postFeedback: builder.mutation({
      query: ({ feedback }) => ({
        url: `${FEEDBACK_URL}`,
        method: "POST",
        body: { feedback: feedback },
      }),
    }),
  }),
});

export const { useGetFeedbacksQuery, usePostFeedbackMutation } =
  feedbackApiSlice;
