type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const API_URL = import.meta.env.VITE_NEST_API_URL || 'http://localhost:3000/api';

export async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: unknown
): Promise<T> {
  console.log('apiRequest', endpoint, method, body);
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!response.ok) {
    const result = await response.json()

    throw new Error(result?.message || `Something went wrong: ${response.statusText}`);
  }

  return response.json() as T;
}