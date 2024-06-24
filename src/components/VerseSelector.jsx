import React, { useState } from 'react';

const VerseSelector = ({ selectedVerse, verses_count, handleChange }) => {
 
console.log(verses_count);
  // Generate options based on verses_count 
  const options = Array.from({ length: verses_count }, (_, index) => (
    <option key={index + 1} value={index + 1}>{index + 1}</option>
  ));

  return (
    <div className='select-wrapper'>
        <select className='form-select form-select-sm' value={selectedVerse} onChange={handleChange}>
            {options}
        </select>
    </div>
  );
};

export default VerseSelector;
