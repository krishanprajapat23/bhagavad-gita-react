import React, { useState } from 'react';
import axios from 'axios';

const GitaVerse = () => {
  const [chapter, setChapter] = useState('');
  const [sloka, setSloka] = useState('');
  const [verse, setVerse] = useState('');

  const fetchVerse = async () => {
    try {
      const response = await axios.get(`https://bhagavadgitaapi.in/slok/${chapter}`);
      console.log(response.data)
      setVerse(response.data.slok);
    } catch (error) {
      console.error('Error fetching verse:', error);
    }
  };

  return (
    <div>
      <h2>Fetch Bhagavad Gita Verse</h2>
      <div>
        <label>Chapter:</label>
        <input type="number" value={chapter} onChange={(e) => setChapter(e.target.value)} />
        <button onClick={fetchVerse}>Fetch Verse</button>
      </div>
      {verse && (
        <div>
          <p>{verse}</p>
        </div>
      )}
    </div>
  );
};

export default GitaVerse;
