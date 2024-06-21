import axios from 'axios';
const API_URL = 'https://bhagavadgitaapi.in';

const fetchChapters = async () => {
  try {
    const response = await axios.get(`${API_URL}/chapters`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch chapters.');
  }
};

const fetchShlokas = async (chapterNumber) => {
  try {
    const response = await axios.get(`${API_URL}/chapter/${chapterNumber}/shlok`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shlokas.');
  }
};

const fetchVerse = async (chapter, verse) => {
  try {
    const response = await axios.get(`${API_URL}/chapters/${chapter}/verse/${verse}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch verse.');
  }
};

export {fetchChapters, fetchShlokas, fetchVerse};