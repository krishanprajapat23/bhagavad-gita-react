import React, { useState, useEffect } from 'react';

const Header = ({ onSearch, toast }) => {
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [scrolling, setScrolling] = useState(false);

  const handleSearch = () => {
    if(chapter.length && verse.length){
      onSearch(chapter, verse);
    } else{
      toast.error('Please enter a Chapter & Verse number!');
    }
  };


  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <header className={`sticky-top ${scrolling ? 'scrolled' : ''}`}>
      <div className="container-lg container-fluid">
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Verse"
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
