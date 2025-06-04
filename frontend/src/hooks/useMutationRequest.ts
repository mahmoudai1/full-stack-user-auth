import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiRequest } from '../utils/api';

export type MutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const useMutationRequest = <TData = unknown, TError = unknown, TVariables = unknown>(
  url: string,
  method: MutationMethod,
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables) => apiRequest<TData>(url, method, variables),
    ...options,
  });
};

export { useMutationRequest };