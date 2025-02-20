import { fetchAPI } from "./fetchUtils";

/**
 * Refreshes the access token using the HTTP-only refresh token cookie.
 */
export const refreshAccessToken = async () => {
    try {
        const response = await fetchAPI(`auth/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({}),
        }, true); // No authentication headers needed, relies on cookies

        // ✅ No need to check `response.ok` here, fetchAPI already throws errors
        console.log("Token refreshed successfully", response);

        return response.access; // The new access token
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
