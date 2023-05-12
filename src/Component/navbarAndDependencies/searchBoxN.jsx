import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ResultContext from '../contextThings'

function SearchBoxN({searchBox}) {

    const [getSearch ,setGetSearch] = useState('')
    const [getResult , setGetResult] = useContext(ResultContext)

    const searchMovie = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&query=${getSearch}&page=1&include_adult=false`)
        setGetResult(get.data.results)
        console.log(get)
    }

    const [getTvResult , setgetTvResult] = useContext(ResultContext)
    const searchTv = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1&query=${getSearch}&include_adult=false`)
        setgetTvResult(get.data.results)
    }

    // const operation1 = ()=>{
    //     if(getSearch === '') {return alert('please search somthing')}
    //     else{
    //         searchTv()
    //         searchMovie()
    //     }

    // }

    
    // const onClickSearch = ()=>{
    //     searchMovie()
    //     searchTv() 
    // }
    // console.log(getSearch);
    // console.log(getResult)
    // console.log(getTvResult)

  return (
    <div className={`type ${searchBox? 'openSearch' : 'closeSearch'}`}>
            <div className="inType">
                <div className="inTypeInput">
                    <input placeholder='search for a movie, tv show, person'className='input1' type='text' onChange={(e)=>{setGetSearch(e.target.value)}} value={getSearch}/>
                </div>
                <div className="inTypeIcon">
                    {/* <Link to={'/searchBoxResultsPage'} ><FaSearch className='inTypeIcon1' onClick={()=>{onClickSearch() ;setGetSearch('')}}/></Link> */}
                    <Link to={'/searchBoxResultsPage'} ><FaSearch className='inTypeIcon1' onClick={()=>{searchTv() ;searchMovie()}}/></Link>
                </div>
            </div>
        </div>
  )
}

export default SearchBoxN