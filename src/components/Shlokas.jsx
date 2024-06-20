import React from 'react';

const Shlokas = ({ shlokas }) => {
  return (
    <div className="shlokas">
      {shlokas.map((shloka) => (
        <div className="card mb-3" key={shloka.verse_number}>
          <div className="card-body">
            <h5 className="card-title">Verse {shloka.verse_number}</h5>
            <p className="card-text">{shloka.text}</p>
            <p className="card-text"><small className="text-muted">{shloka.translation}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shlokas;
