const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export function getAuthToken() {
  return localStorage.getItem('abtalks_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('abtalks_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('abtalks_token');
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || 'Login failed');
  }

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function register(name: string, email: string, password: string, trackId?: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, trackId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || 'Registration failed');
  }

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}
