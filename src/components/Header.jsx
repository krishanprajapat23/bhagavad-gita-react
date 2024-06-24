import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolling, setScrolling] = useState('');
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
      hey
    </header>
  );
};

export default Header;
