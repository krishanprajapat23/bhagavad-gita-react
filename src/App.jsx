import React, { useState, useEffect } from "react";
import { fetchChapters, fetchShlokas, fetchVerse } from "./api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChapterCard from "./components/ChapterCard";
import Header from "./components/Header";
import Shlokas from "./components/Shlokas";

const App = () => {
  const [chapters, setChapters] = useState([]);
  const [shlokas, setShlokas] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://bhagavadgitaapi.in";

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`${API_URL}/chapters`)
  //     .then((response) => {
  //       setChapters(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError('Failed to fetch chapters.');
  //       toast.error(error)
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    setLoading(true);
    try {
      const data = await fetchChapters();
      setChapters(data);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterClick = async (chapterNumber) => {
    setLoading(true);
    try {
      const data = await fetchShlokas(chapterNumber);
      setShlokas(data);
      setSelectedChapter(chapterNumber);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (chapter, verse) => {
    setLoading(true);
    try {
      const data = await fetchVerse(chapter, verse);
      setShlokas([data]);
      setSelectedChapter(chapter);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <Header onSearch={handleSearch} toast={toast} />
      <div className="container-lg container-fluid">
        <div className="chapter-list">
          <div className="row gy-4">
            {chapters.map((chapter) => (
              <ChapterCard
                key={chapter.chapter_number}
                chapter={chapter}
                onClick={handleChapterClick}
              />
            ))}
          </div>
        </div>
        {selectedChapter && <Shlokas shlokas={shlokas} />}
      </div>
    </>
  );
};

export default App;
