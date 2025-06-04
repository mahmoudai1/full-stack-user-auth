import { UseQueryOptions } from "@tanstack/react-query";
import { useGetRequest } from "./useGetRequest";

export const useDashboard = (options?: UseQueryOptions) => {
  return useGetRequest(`/dashboard`, options);
};