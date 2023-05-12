import React from 'react'
import nullImage from '../../assets/1.png'

const defaultImg = nullImage

function PeopleForMovieCardExpend({actors}) {
  return (
    <div className='expend-actors'>
        <img src={actors.profile_path ? `https://image.tmdb.org/t/p/w500/${actors.profile_path}` : defaultImg } alt={actors.name} className='ex-img-actor' />
        <div className="realName">
          <p className='realName-p1'>{actors.name}</p>
          <p className='realName-p2'>{actors.character}</p>
        </div>
    </div>
  )
}

export default PeopleForMovieCardExpend