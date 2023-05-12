import React from 'react'

export default function ShowResults({res}) {
    return(
        <div className='orgr' >
          <div className="left-part-img">
            <img src={`https://image.tmdb.org/t/p/w500/${res?.poster_path}`} alt="" className='searchImg'/>
          </div>
          <div className="right-part-details">
            <div className="center">
              <p className='searchTitle'>{res?.title && res.title }</p>
              <p className='searchReleaseDate'> {res?.release_date}</p>
              <p className='searchOverview'>{res?.overview}</p>
            </div>
          </div>
        </div>
      )
}
