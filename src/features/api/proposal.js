import { apiSlice } from "./apiSlice";

const proposal = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranchlist: builder.query({
      query: () => ({
        url: "/all-branch",
      }),
      providesTags: ["proposal_head"],
    }),

    getProjectlist: builder.query({
      query: () => ({
        url: "/all-project",
      }),
      providesTags: ["proposal_head"],
    }),

    getChainlist: builder.query({
      query: ({ BASE_PROJECT, BASE_CODE }) => ({
        url: `/chain-list/${BASE_PROJECT}/${BASE_CODE}`,
      }),
      providesTags: ["proposal_head"],
    }),
  }),
});

export const {
  useGetBranchlistQuery,
  useGetProjectlistQuery,
  useGetChainlistQuery,
} = proposal;
