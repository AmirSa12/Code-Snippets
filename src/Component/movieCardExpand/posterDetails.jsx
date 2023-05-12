import React from 'react'
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function PosterDetails({getDT}) {
  
  function formatMovieLength() {   // we can put function in our return
    const hours = Math.floor(getDT.runtime / 60);
    const remainingMinutes = getDT.runtime % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const tarikh = Math.floor(getDT.vote_average) // we can put const in  our return 

  const fullDate = getDT && getDT.release_date ? getDT.release_date : '';
  const year = fullDate.substr(0, 4)
  
  return (
    <div className='detail-main'>
        <div className='poster' style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${getDT.backdrop_path})`}}></div>
        <div className="collect">
            <div className="left-poster">
                  <img className='poster-img' src={`https://www.themoviedb.org/t/p/original${getDT.poster_path}`} alt="" />
            </div>
            <div className="right-poster">
              <div className="orgenize-top">
                <div className="right-poster-row1">
                  <p className='original_title'>{getDT.original_title}</p>
                  <p className='release_date1'>{year}</p>
                </div>
                <div className="right-poster-row2">
                  <p className='release_date2'>{getDT.release_date}</p>
                  <p className='genres_poster'>{getDT.genres?.map((g)=> g.name).reduce((acc ,cur)=> acc+', '+cur)}</p>
                  <p className='runtime'>{formatMovieLength()}</p>
                </div>
                <div className="right-poster-row3">
                  {/* <p className='vote_average'>{getDT.vote_average?.toFixed(1)}</p> */}
                  <CircularProgressbar className='vote_average' value={getDT.vote_average} minValue={0} maxValue={10} text={`${getDT.vote_average?.toFixed(1)}`} styles={buildStyles({textSize: '37px', textColor: 'white',pathColor: getDT.vote_average < 3 ? '#a22955' : getDT.vote_average < 7 ? '#b4bc66' : '#3bc183' , trailColor: getDT.vote_average < 3 ? '#541634' : getDT.vote_average < 7 ? '#3f3d13' : '#21442b', bottomPadding : "3rem" })} />
                </div>
                <div className="right-poster-row4">
                  <p className='tagline'>{getDT.tagline}</p>
                </div>
                <div className="right-poster-row5">
                  <p className='overview1'>Overview</p>
                  <p className='overview2'>{getDT.overview}</p>
                </div>
                <div className="right-poster-row6">
                  <div className='country'>
                     <p className='country_title'>production countries :</p>
                     <p className='countries'>{getDT.production_countries?.map((f)=>( f.name)).reduce((acc , cur)=>acc +' , '+ cur)}</p>
                  </div>
                </div>
                <div className="right-poster-row7">
                  <div className="status-situation">
                    <p className="status_title">status :</p>
                    <p className='status'> {getDT.status}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    

  )
}

export default PosterDetails
