import axios from "axios";

const API_URL = "https://vedicscriptures.github.io/";


const fetchChapters = async () => {
  try {
    const response = await axios.get(`${API_URL}/chapters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const fetchChapter = async (chapter_number) => {
  try {
    const response = await axios.get(`${API_URL}/chapter/${chapter_number}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const fetchSpecificShlok = async (chapter, shlok) => {
  try {
    const response = await axios.get(`${API_URL}/slok/${chapter}/${shlok}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shlok ${chapter}/${shlok}:`, error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export { fetchChapters, fetchSpecificShlok,fetchChapter};
