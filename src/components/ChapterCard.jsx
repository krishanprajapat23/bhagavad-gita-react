// src/components/ChapterCard.jsx
import VerseSelector from './VerseSelector';

const ChapterCard = ({ chapter, handleChapterClick, selectedChapter, selectedVerse, handleChange, handleBackToChapters }) => {
  const { name, chapter_number, meaning, translation, verses_count, summary } = chapter || {};


  const onChapterClick = () => {
    if (!selectedChapter) {
      handleChapterClick(chapter_number);
    }
  };

  return (
    <div className={`${selectedChapter ? 'col-lg-10 mx-auto selected-col' : 'col-xxl-3 col-lg-4 col-sm-6 card-col'}`} onClick={onChapterClick}>
      <article className="card">
      {
        selectedChapter && <button className="btn btn-warning ms-auto m-3" onClick={handleBackToChapters}>Back</button>
      }
        <div className="card-body border-0">
          <div className="card-content">
            {selectedChapter ? (
              <div className="d-flex justify-content-between">
                <span className="ch-no">{chapter_number}</span>
                <div className="verse-wrapper">
                  <h6 className="mb-1 total-verse">Verse:</h6>
                  <VerseSelector verses_count={verses_count} selectedVerse={selectedVerse} handleChange={handleChange} />
                </div>
              </div>
            ) : (
              <span className="ch-no">{chapter_number}</span>
            )}
            <h5 className="card-title mb-1">{name}</h5>
            <h6 className="card-desc small mb-2">({translation})</h6>
            <p className="card-text mb-0">{meaning?.en}</p>
            {selectedChapter && (
              <>
                <p className="card-text mb-0">{meaning?.hi}</p>
                <p className="card-text mb-0">{summary?.en}</p>
                <p className="card-text mb-0">{summary?.hi}</p>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ChapterCard;
