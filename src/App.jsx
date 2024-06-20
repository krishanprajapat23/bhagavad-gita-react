import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChapterCard from './components/ChapterCard';
import Header from './components/Header';
import Shlokas from './components/Shlokas';

const App = () => {
  const [chapters, setChapters] = useState([]);
  const [shlokas, setShlokas] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://bhagavadgitaapi.in';


  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/chapters`)
      .then((response) => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch chapters.');
        toast.error(error)
        setLoading(false);
      });
  }, []);

  const handleChapterClick = (chapterNumber) => {
    axios.get(`https://bhagavadgitaapi.in/chapter/${chapterNumber}/shlok`).then((response) => {
      setShlokas(response.data);
      setSelectedChapter(chapterNumber);
    });
  };

  const handleSearch = (chapter, verse) => {
    axios.get(`https://bhagavadgitaapi.in/chapters/${chapter}/verse/${verse}`).then((response) => {
      setShlokas([response.data]);
      setSelectedChapter(chapter);
    });
  };

  return (
    <>
      <ToastContainer theme="colored"/>
      <Header onSearch={handleSearch} toast={toast}/>
      <div className="container-lg container-fluid">
        <div className="chapter-list">
          <div className="row gy-4">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.chapter_number} chapter={chapter} onClick={handleChapterClick} />
            ))}
          </div>
        </div>
        {selectedChapter && <Shlokas shlokas={shlokas} />}
      </div>
    </>
  );
};

export default App;
