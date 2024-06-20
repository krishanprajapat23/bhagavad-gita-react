import React from 'react';

const ChapterCard = ({ chapter, onClick }) => {
  const {name, chapter_number, meaning} = chapter;
  return (
      <div className="col-xxl-3 col-lg-4 col-sm-6 card-col">
        <article className="card" onClick={() => onClick(chapter.chapter_number)}>
          <div className="card-body border-0">
            <div className="card-content">
              <span className='ch-no'>{chapter_number}</span>
              <h5 className="card-title mb-3">{name}</h5>
              <p className='card-text mb-0'>{meaning.en}</p>
            </div>
          </div>
        </article>
      </div>
  );
};

export default ChapterCard;
