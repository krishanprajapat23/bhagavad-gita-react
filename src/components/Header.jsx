import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/logo.png';

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
      <div className="text-center"><img src={Logo} alt="Bhagavad Gita" className='img-fluid'/></div>
    </header>
  );
};

export default Header;
