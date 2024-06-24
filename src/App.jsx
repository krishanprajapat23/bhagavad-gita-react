import React, { useState, useEffect } from "react";
import { fetchChapters, fetchSpecificShlok, fetchChapter } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Chapters from "./components/Chapters";
import ChapterCard from "./components/ChapterCard";
import Shlok from "./components/Shlok";

const App = () => {
  const [chapters, setChapters] = useState([]);
  const [shlok, setShlok] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState("1");

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    setLoading(true);
    try {
      const data = await fetchChapters();
      setChapters(data);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterClick = async (chapterNumber) => {
    setLoading(true);
    try {
      // Fetch detailed chapter information
      const chapterInfo = await fetchChapter(chapterNumber);
      setSelectedChapter({ chapterNumber, data: chapterInfo });

      // Fetch first shloka of the chapter
      const shlokData = await fetchSpecificShlok(chapterNumber, "1");
      setShlok(shlokData);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (chapter, shlok) => {
    setLoading(true);
    try {
      const data = await fetchSpecificShlok(chapter, shlok);
      setShlok(data);
      setSelectedVerse(shlok); // Update selectedVerse state
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedVerse(e.target.value);
    if (selectedChapter) {
      handleSearch(selectedChapter.chapterNumber, e.target.value);
    }
  };

  const handleFetchError = (error) => {
    setError(error.message);
    toast.error(error.message);
    setLoading(false);
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <Header />
      {loading && <Loader />}
      <div className="container-lg container-fluid">
        {selectedChapter ? (
          <ChapterCard
            selectedChapter={selectedChapter.chapterNumber}
            chapter={selectedChapter.data}
            selectedVerse={selectedVerse}
            handleChange={handleChange}
          />
        ) : (
          <Chapters
            chapters={chapters}
            handleChapterClick={handleChapterClick}
          />
        )}
        {shlok && <Shlok shlok={shlok} />}
      </div>
    </>
  );
};

export default App;
