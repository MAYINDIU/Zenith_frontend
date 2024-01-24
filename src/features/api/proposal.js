import { apiSlice } from "./apiSlice";

const proposal = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEducationList: builder.query({
      query: () => ({
        url: "/educationList",
      }),
      providesTags: ["proposal_head"],
    }),

    getSupplimentClassList: builder.query({
      query: () => ({
        url: "/suppli-class",
      }),
      providesTags: ["proposal_head"],
    }),

    getSupplimentList: builder.query({
      query: () => ({
        url: "/suppliment-list",
      }),
      providesTags: ["proposal_head"],
    }),
    getallTypeList: builder.query({
      query: () => ({
        url: "/type-list",
      }),
      providesTags: ["proposal_head"],
    }),

    getBankList: builder.query({
      query: () => ({
        url: "/all-bank",
      }),
      providesTags: ["proposal_head"],
    }),

    getPremiumList: builder.query({
      query: () => ({
        url: "/all-premium",
      }),
      providesTags: ["proposal_head"],
    }),

    getPlanlist: builder.query({
      query: (age) => ({
        url: `/all-plan/${age}`,
      }),
      providesTags: ["proposal_head"],
    }),

    getOccupationlist: builder.query({
      query: () => ({
        url: "/occupation",
      }),
      providesTags: ["proposal_head"],
    }),

    getCountrylist: builder.query({
      query: () => ({
        url: "/country",
      }),
      providesTags: ["proposal_head"],
    }),
    getBranchlist: builder.query({
      query: () => ({
        url: "/all-branch",
      }),
      providesTags: ["proposal_head"],
    }),
    getGender: builder.query({
      query: () => ({
        url: "/all-gender",
      }),
      providesTags: ["proposal_head"],
    }),
    getLocallity: builder.query({
      query: () => ({
        url: "/all-locallity",
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
    getModelist: builder.query({
      query: (PLAN_ID) => ({
        url: `/mode-list/${PLAN_ID}`,
      }),
      providesTags: ["proposal_head"],
    }),

    getThanalist: builder.query({
      query: (DIV_CODE) => ({
        url: `/thana-list/${DIV_CODE}`,
      }),
      providesTags: ["proposal_head"],
    }),
    getPostofficelist: builder.query({
      query: (CODE) => ({
        url: `/post-office/${CODE}`,
      }),
      providesTags: ["proposal_head"],
    }),
    getBankbranchlist: builder.query({
      query: (BANK_CODE) => ({
        url: `/branch-list/${BANK_CODE}`,
      }),
      providesTags: ["proposal_head"],
    }),

    getSuppliPremium: builder.query({
      query: (
        table_id,
        occup_id,
        supp_type,
        supp_class,
        sum_assured,
        pay_mode
      ) => ({
        url: `/suppliment-premium/${table_id}/${occup_id},${supp_type},${supp_class},${sum_assured},${pay_mode}`,
      }),
      providesTags: ["proposal_head"],
    }),

    createProposalEntry: builder.mutation({
      query: (data) => ({
        url: `/proposal-entry`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["proposal_head"],
    }),
  }),
});

export const {
  useGetallTypeListQuery,
  useGetSuppliPremiumQuery,
  useGetSupplimentListQuery,
  useGetSupplimentClassListQuery,
  useGetBankbranchlistQuery,
  useGetBankListQuery,
  useGetPremiumListQuery,
  useGetModelistQuery,
  useGetPlanlistQuery,
  useCreateProposalEntryMutation,
  useGetEducationListQuery,
  useGetOccupationlistQuery,
  useGetCountrylistQuery,
  useGetLocallityQuery,
  useGetGenderQuery,
  useGetThanalistQuery,
  useGetBranchlistQuery,
  useGetProjectlistQuery,
  useGetAgentlistQuery,
  useGetDistrictlisttQuery,
  useGetPostofficelistQuery,
} = proposal;
