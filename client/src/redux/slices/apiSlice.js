import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_APP_BASE_URL + "/api";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
  baseQuery,
  // ADD THE TAG TYPES HERE - this is what was missing!
  tagTypes: ['Task', 'DashboardStats', 'User'],
  endpoints: (builder) => ({}),
});