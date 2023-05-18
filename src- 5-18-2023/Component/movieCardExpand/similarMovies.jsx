import React from 'react'

function SimilarMovies({sim}) {
  return (
        <div className='mainRec'>
        <div className="">
            <img src={`https://image.tmdb.org/t/p/w500/${sim.backdrop_path}`} alt="" className='recImdStyle'/>
        </div>
        <div className="rec-ditails">
            <div className="rec-movie-name">
            <p>{sim.title}</p>
            </div>
            <div className="rec-score">
            <p>{sim.vote_average.toFixed(1)+'%'}</p>
            </div>
        </div>
        </div>
    )
}

export default SimilarMovies