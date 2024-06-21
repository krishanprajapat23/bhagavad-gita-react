import React from 'react';

const Shlok = ({ shlok }) => {
  const {_id, chapter, verse, slok, transliteration, tej, purohit, rams, raman, sankar, } = shlok;
  console.log(shlok);
  return (
    <div className="shlok-wrapper my-2 py-3">
      <div className="card mb-3 shadow-none" key={_id}>
        <div className="card-body">
          <div className="intro-part text-center">
            <div className="title-wrapper mb-3">
              <h5 className="card-title mb-0">Chapter {chapter} : Verse {verse}</h5>
            </div>
            <div className="shlok-text">
              <pre className="shlok fs-5 fw-bold">
                {slok}
              </pre>
              <pre className="text-muted small slok-transliteration">
                {transliteration}
              </pre>
            </div>
          </div>
          <div className="body-part">
            <div className="body-part-sec mb-4">
              <div className="title-wrapper bg-warning mb-3 text-center">
                <h5 className="card-title mb-0">Translation</h5>
              </div>
              <div className='p-2 text fw-semibold'>
                <span className='badge bg-warning text-dark'>{_id} </span> {tej?.ht}
                <div className='mt-2'>{purohit.et}</div>
              </div>
            </div>
            <div className="body-part-sec mb-4">
              <div className="title-wrapper bg-warning mb-3 text-center">
                <h5 className="card-title mb-0">Commentary</h5>
              </div>
              <div className='p-2 text fw-semibold'>
                {
                  rams.hc && (
                    <>
                      <span className='badge bg-warning text-dark'>{rams.author} </span>
                      <div className='mt-2'>{rams.hc}</div>
                    </>
                  )
                }
              </div>
              <div className='p-2 text fw-semibold'>
                {
                  rams.hc && (
                    <>
                      <span className='badge bg-warning text-dark'>{rams.author} </span>
                      <pre className='mt-2'>{rams.hc}</pre>
                    </>
                  )
                }
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shlok;
