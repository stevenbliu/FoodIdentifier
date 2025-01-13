import { fetchAPI } from "./fetchUtils";

/**
 * Refreshes the access token using the refresh token.
 */
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
  
    if (!refreshToken) {
      throw new Error('No refresh token found.');
    }
  
    try {
        const response = await fetchAPI(`token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
          }, false); // No authentication needed for this endpoint
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token refresh error:', errorData);
        throw new Error(errorData.error || 'Failed to refresh token.');
      }
  
      const { access, refresh } = await response.json();
      localStorage.setItem('access_token', access);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }
  
      return access;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };


  /**
 * Helper to determine if a token is expired.
 */
export function isTokenExpired(token) {
    try {
      if (!token) return true;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true; // Treat invalid token as expired
    }
  }