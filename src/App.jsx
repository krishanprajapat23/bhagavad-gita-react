import React, { useState, useEffect } from "react";
import { fetchChapters, fetchSpecificChapter, fetchSpecificShlok } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Chapters from "./components/Chapters";
import Shlok from "./components/Shlok";

const App = () => {
  const [chapters, setChapters] = useState([]);
  const [shlok, setShlok] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
      const data = await fetchSpecificChapter(chapterNumber);
      setShlok(data);
      setSelectedChapter(chapterNumber);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (chapter, shlok) => {
    setLoading(true);
    try {
      const data = await fetchSpecificShlok(chapter, shlok);
      // console.log(data);
      setShlok(data);
      setSelectedChapter(chapter);
      console.log(selectedChapter);
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
      { loading && <Loader /> }
      <div className="container-lg container-fluid">
      <Chapters chapters={chapters} handleChapterClick={handleChapterClick}/>
        {selectedChapter && <Shlok shlok={shlok} />}
      </div>
    </>
  );
};

export default App;
