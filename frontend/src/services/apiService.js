const API_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;

export const apiService = {
  sendTestRequest: async () => {
    const response = await fetch(`${API_URL}/photos/inject-test-data/`, { method: 'POST' });
    if (!response.ok) throw new Error('Test request failed');
  },

  subscribeToNotifications: async () => {
    const response = await fetch(`${API_URL}/photos/subscribe/`, { method: 'GET' });
    if (!response.ok) throw new Error('Subscription failed');
  },

  fetchPhotoDetails: async (photoId) => {
    const response = await fetch(`${API_URL}/photos/${photoId}/`, { method: 'GET' });
    if (!response.ok) throw new Error('Fetching photo details failed');
    return await response.json();
  },
};
