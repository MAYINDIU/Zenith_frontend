import { apiSlice } from "./apiSlice";

const proposal = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranchlist: builder.query({
      query: () => ({
        url: "/all-branch",
      }),
      providesTags: ["proposal_head"],
    }),
    getDistrictlistt: builder.query({
      query: () => ({
        url: "/all-district",
      }),
      providesTags: ["proposal_head"],
    }),

    getProjectlist: builder.query({
      query: () => ({
        url: "/all-project",
      }),
      providesTags: ["proposal_head"],
    }),

    getAgentlist: builder.query({
      query: (BASE_PROJECT) => ({
        url: `/agent-list/${BASE_PROJECT}`,
      }),
      providesTags: ["proposal_head"],
    }),
    getThanalist: builder.query({
      query: (DIV_CODE) => ({
        url: `/thana-list/${DIV_CODE}`,
      }),
      providesTags: ["proposal_head"],
    }),
  }),
});

export const {
  useGetThanalistQuery,
  useGetBranchlistQuery,
  useGetProjectlistQuery,
  useGetAgentlistQuery,
  useGetDistrictlisttQuery,
} = proposal;
