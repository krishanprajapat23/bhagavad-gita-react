import ChapterCard from "./ChapterCard";

const Chapters = ({ chapters, handleChapterClick }) => {
  return (
    <div className="chapter-list">
      <div className="row gy-4">
        {chapters.map((chapter) => (
          <ChapterCard 
            key={chapter.chapter_number} 
            chapter={chapter} 
            handleChapterClick={handleChapterClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default Chapters;
