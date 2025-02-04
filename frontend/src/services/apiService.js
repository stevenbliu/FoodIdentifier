const API_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;

import { fetchAPI} from './fetchUtils';

export const apiService = {
  sendTestRequest: async () => {
    const response = await fetchAPI(`photos/inject-test-data/`, { method: 'POST' });
    if (!response.ok) throw new Error('Test request failed');
  },

  subscribeToNotifications: async () => {
    const response = await fetchAPI(`photos/subscribe/`, { method: 'GET' });
    if (!response.ok) throw new Error('Subscription failed');
  },

  fetchPhotoDetails: async (photoId) => {
    const response = await fetchAPI(`photos/${photoId}/`, { method: 'GET' });
    if (!response.ok) throw new Error('Fetching photo details failed');
    return await response.json();
  },
};
