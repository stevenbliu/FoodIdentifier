import { fetchAPI} from './fetchUtils';


const PHOTO_URL = `/photos`;

export const photoService = {
  uploadImage: async (file) => {
    const createResponse = await fetchAPI(`${PHOTO_URL}/create/`, {
      method: 'POST',
      body: JSON.stringify({ filename: file.name, file_size: file.size }),
      headers: { 'Content-Type': 'application/json' },
    });
    const { url } = await createResponse.json();

    if (!url) throw new Error('Invalid response from server.');

    const uploadResponse = await fetchAPI(url, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    if (!uploadResponse.ok) throw new Error('Image upload failed.');

    return url;
  },
};
