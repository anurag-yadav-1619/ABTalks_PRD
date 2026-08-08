import { getAuthHeaders } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export async function fetchDashboardData() {
  const response = await fetch(`${API_BASE_URL}/me/dashboard`, {
    headers: { ...getAuthHeaders() }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}

export async function fetchChallengeDay(dayNumber: string | number) {
  const response = await fetch(`${API_BASE_URL}/me/challenge/days/${dayNumber}`, {
    headers: { ...getAuthHeaders() }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch challenge day');
  }
  return response.json();
}

export async function submitChallengeDay(challengeDayId: string, githubUrl: string, linkedinUrl: string, note?: string) {
  const response = await fetch(`${API_BASE_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      challengeDayId,
      githubUrl,
      linkedinUrl,
      note,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to submit challenge');
  }
  return response.json();
}

export async function fetchTracks() {
  const response = await fetch(`${API_BASE_URL}/tracks`, {
    headers: { ...getAuthHeaders() }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tracks');
  }
  return response.json();
}
