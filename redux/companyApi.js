import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery("http://localhost:3000"),
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: (email) => `/api/get/company/${email}`,
      providesTags: ["Company"],
    }),
    getCompanyProducts: builder.query({
      query: (email) => `/api/get/company/products/${email}`,
    }),
    getProduct: builder.query({
      query: (productId) => `/api/get/product/${productId}`,
    }),

    getPlan: builder.query({
      query: () => `/api/get/plan`,
    }),
    getCompanyPlan: builder.query({
      query: (planType) => `/api/get/plan/${planType}`,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/api/create/product",
        method: "POST",
        body: JSON.stringify(newProduct),
        body: newProduct,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Company"],
    }),
    updateVisible: builder.mutation({
      query: (updateVisible) => ({
        url: `/api/modify/product_visible?productId=${updateVisible}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Company"],
    }),
    updateActive: builder.mutation({
      query: (updateActive) => ({
        url: `/api/modify/product_active?productId=${updateActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Company"],
    }),
    updateProduct: builder.mutation({
      query: (updateProduct) => ({
        url: `/api/modify/product`,
        method: "PUT",
        body: updateProduct,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Company"],
    }),
    updateAccount: builder.mutation({
      query: (updateAccount) => ({
        url: `/api/modify/product`,
        method: "PUT",
        body: updateAccount,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Company"],
    }),
    updatePicture: builder.mutation({
      query: (updatePicture) => ({
        url: `/api/modify/company/profilePicture`,
        method: "PUT",
        body: updatePicture,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Company"],
    }),
  }),
  tagTypes: ["Company"],
});

export const {
  useGetCompanyQuery,
  useLazyGetProductQuery,
  useGetPlanQuery,
  useLazyGetCompanyPlanQuery,
  useGetCompanyProductsQuery,
  //mutations
  useCreateProductMutation,
  useUpdateActiveMutation,
  useUpdateVisibleMutation,
  useUpdateProductMutation,
  useUpdatePictureMutation,
} = companyApi;
