import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../utils/api';

const useGetRequest = <TData = unknown, TError = unknown>(
  url: string,
  options?: UseQueryOptions<TData, TError>
) => {
  return useQuery<TData, TError>({
    queryKey: [url],
    queryFn: () => apiRequest<TData>(url, 'GET'),
    staleTime: 1000 * 60,
    ...options,
  });
};

export { useGetRequest };