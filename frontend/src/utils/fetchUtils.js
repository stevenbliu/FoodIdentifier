import { refreshAccessToken } from "./tokenUtils";

// const BACKEND_URL = process.env.REACT_APP_NGROK_PUBLIC_URL || 'http://localhost:8000/api/';
const BACKEND_URL = "http://localhost:8000/api/";

/**
 * A unified fetch method that handles both authenticated and unauthenticated requests.
 * @param {string} endpoint - API endpoint (relative to the base URL).
 * @param {Object} options - Fetch options (method, headers, body, etc.).
 * @param {boolean} requiresAuth - Whether the request requires authentication.
 * @returns {Promise<Object>} - The API response data.
 * @throws {Error} - Throws if the request fails.
 */
export const fetchAPI = async (endpoint, options = {}, requiresAuth = false) => {
  const url = `${BACKEND_URL}${endpoint}`;
  console.log("fetchingAPI url:", url);

  let headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    // Let the browser set Content-Type for FormData
    delete headers["Content-Type"];
  }

  if (process.env.DEVELOPER_ENV === "1") {
    headers["ngrok-skip-browser-warning"] = 63940;
  }

  // Get CSRF Token from cookies
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  if (csrfToken) {
    headers["X-CSRFToken"] = csrfToken;
  }

  try {
    console.log("body:", options.body);
    let response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Ensures cookies (JWT) are sent
    });

    console.log("fetch Utils response:", response);

    // Handle Unauthorized (401) -> Attempt to refresh token
    if (response.status === 401 && requiresAuth) {
      console.warn("Access token expired. Attempting refresh...");

      try {
        await refreshAccessToken(); // Refresh the token

        console.log("Retrying request after token refresh...");
        response = await fetch(url, {
          ...options,
          headers,
          credentials: "include",
        });
      } catch (refreshError) {
        console.error("Token refresh failed. User needs to re-authenticate.");
        throw new Error("Unauthorized. Please log in again.");
      }
    }

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        "fetch Utils Response Failed:",
        `HTTP Response: ${response.status} - ${errorDetails}`
      );
      throw new Error(`HTTP Response: ${response.status} - ${errorDetails}`);
    }

    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log("fetch Utils response data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
