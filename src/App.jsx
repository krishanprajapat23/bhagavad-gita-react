import React, { useState, useEffect, useRef } from "react";
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
  const [currentShlok, setCurrentShlok] = useState(1);
  const [verseTotal, setVerseTotal] = useState(0);


  const shlokRef = useRef(null);



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

      setVerseTotal(chapterInfo.verses_count);
      setCurrentShlok(shlokData.verse);
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
      setCurrentShlok(Number(e.target.value));
    }
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setSelectedVerse("1"); 
  };

  const handlePrevClick = () => {
    if (currentShlok > 1) {
      setCurrentShlok((prevShlok) => {
        const currentUpdatedShlok = prevShlok - 1;
        handleSearch(
          selectedChapter.chapterNumber,
          currentUpdatedShlok.toString()
        );
        return currentUpdatedShlok;
      });
      shlokRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleNextClick = (e) => {
    if (currentShlok < verseTotal) {
      setCurrentShlok((prevShlok) => {
        const currentUpdatedShlok = prevShlok + 1;
        handleSearch(
          selectedChapter.chapterNumber,
          currentUpdatedShlok.toString()
        );
        return currentUpdatedShlok;
      });
      shlokRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleFetchError = (error) => {
    setError(error.message);
    toast.error(error.message);
    console.error(error);
    setLoading(false);
  };


  useEffect(() => {
    loadChapters();
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <Header />
      {loading && <Loader />}
      <div className="container-lg container-fluid mt-2">        
        {selectedChapter ? (
          <ChapterCard
            selectedChapter={selectedChapter.chapterNumber}
            chapter={selectedChapter.data}
            selectedVerse={selectedVerse}
            handleChange={handleChange}
            handleBackToChapters={handleBackToChapters}
          />
        ) : (
          <Chapters
            chapters={chapters}
            handleChapterClick={handleChapterClick}
          />
        )}
        {(selectedChapter && shlok) && (
          <>
            <Shlok ref={shlokRef} shlok={shlok} />
            <div className="nav-btn-wrapper d-flex justify-content-between align-items-center p-4 mb-3">
              <button onClick={handlePrevClick} className={`btn btn-warning ${(currentShlok <= 1 ) ? 'disabled' : ''}`}>Previous</button>
              {currentShlok && <small className="border px-2 rounded-pill p-1">{`${currentShlok}/${verseTotal}`}</small>}
              <button onClick={handleNextClick} className="btn btn-warning">Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
