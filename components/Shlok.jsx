import React from "react";
const Shlok = React.forwardRef(({ shlok}, ref) => {
  console.log(shlok);
  const {_id, chapter, verse, slok, transliteration, tej, purohit, rams, raman, sankar, } = shlok;
  return (
    <div className="shlok-wrapper my-2 py-3" ref={ref}>
      <div className="card mb-3 shadow-none" key={_id}>
        <div className="card-body">
          <div className="intro-part text-center">
            <div className="title-wrapper mb-3">
              <h5 className="card-title mb-0">Chapter {chapter} : Verse {verse}</h5>
            </div>
            <div className="shlok-text">
              <p className="shlok prewrap fs-5 fw-bold">
                {slok}
              </p>
              <p className="text-muted prewrap small slok-transliteration">
                {transliteration}
              </p>
            </div>
          </div>
          <div className="body-part">
            <div className="body-part-sec mb-4">
              <div className="title-wrapper bg-warning mb-3 text-center">
                <h5 className="card-title mb-0">Translation</h5>
              </div>
              <div className='p-2 text fw-semibold'>
                <span className='badge prewrap bg-warning text-dark'>{_id} </span> {tej?.ht}
                <div className='mt-2 prewrap'>{purohit?.et}</div>
              </div>
            </div>
            <div className="body-part-sec mb-4">
              <div className="title-wrapper bg-warning mb-3 text-center">
                <h5 className="card-title mb-0">Commentary</h5>
              </div>
                {
                  rams && (!rams.hc.includes("did not comment")) && (
                    <div className='p-2 text fw-semibold'>
                      <span className='badge bg-warning text-dark'>{rams.author} </span>
                      <p className='mt-2 prewrap'>{rams.hc}</p>
                    </div>
                  )
                }
                {
                  raman && (!raman.et.includes("did not comment")) &&  (
                    <div className='p-2 text fw-semibold'>
                      <span className='badge bg-warning text-dark'>{raman.author} </span>
                      <p className='mt-2 prewrap'>{raman.et}</p>
                    </div>
                  )
                }
                {
                  sankar && (!sankar.ht.includes("did not comment")) && (
                    <div className='p-2 text fw-semibold'>
                      <span className='badge bg-warning text-dark'>{sankar.author} </span>
                      <p className='mt-2 prewrap'>{sankar.ht}</p>
                    </div>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Shlok;
