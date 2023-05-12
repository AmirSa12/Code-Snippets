import React from 'react'

function RecommendationMovieCard({recommend}) {
  return (
    <div className='mainRec'>
      <div className="">
        <img src={`https://image.tmdb.org/t/p/w500/${recommend.backdrop_path}`} alt="" className='recImdStyle'/>
      </div>
      <div className="rec-ditails">
        <div className="rec-movie-name">
          <p>{recommend.title}</p>
        </div>
        <div className="rec-score">
          <p>{recommend.vote_average.toFixed(1)+'%'}</p>
        </div>
      </div>
    </div>
  )
}

export default RecommendationMovieCard