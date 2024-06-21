import axios from 'axios';
const API_URL = 'https://bhagavadgitaapi.in';

const fetchChapters = async () => {
  try {
    const response = await axios.get(`${API_URL}/chapters`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch all chapters.');
  }
};

const fetchSpecificChapter = async (chapterNumber) => {
    try {
      const response = await axios.get(`${API_URL}/chapter/${chapterNumber}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Chapter.');
    }
};

const fetchSpecificShlok = async (chapter, shlok) => {
  try {
    const response = await axios.get(`${API_URL}/slok/${chapter}/${shlok}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shlok.');
  }
};

export {fetchChapters, fetchSpecificChapter, fetchSpecificShlok};