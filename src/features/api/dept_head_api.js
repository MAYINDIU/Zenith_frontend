import { apiSlice } from "./apiSlice";

const dept_head_api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeptHeadPmodulelist: builder.query({
      query: (PERSONAL_ID) => ({
        url: `/dept-head-pmodule-list/${PERSONAL_ID}`,
      }),
      providesTags: ["dept_head"],
    }),

    getDeptPermissionList: builder.query({
      query: (module_id) => ({
        url: `/getDeptPermissionList/${module_id}`,
      }),
      providesTags: ["dept_head"],
    }),
    getProjectPrevlist: builder.query({
      query: (module_id) => ({
        url: `/project-privilage-list/${module_id}`,
      }),
      providesTags: ["dept_head"],
    }),

    getRolePrevlist: builder.query({
      query: (module_id) => ({
        url: `/role-privilage-list/${module_id}`,
      }),
      providesTags: ["dept_head"],
    }),

    getUserprivilagelist: builder.query({
      query: ({ module_id, DEPT_CODE }) => ({
        url: `/permission-list-desk/${module_id}/${DEPT_CODE}`,
      }),
      providesTags: ["dept_head"],
    }),

    getDepartmentHead: builder.query({
      query: () => ({
        url: "/department-head-list",
      }),
      providesTags: ["dept_head"],
    }),

    createPermission: builder.mutation({
      query: (data) => ({
        url: `/create-permission-new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dept_head"],
    }),

    removeSingleCart: builder.mutation({
      query: (id) => ({
        url: `/cartlist_delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["show_cartlist"],
    }),
  }),
});

export const {
  useGetDeptPermissionListQuery,
  useGetUserprivilagelistQuery,
  useGetRolePrevlistQuery,
  useGetProjectPrevlistQuery,
  useGetDeptHeadPmodulelistQuery,
  useGetDepartmentHeadQuery,
  useCreatePermissionMutation,
  useRemoveSingleCartMutation,
} = dept_head_api;
