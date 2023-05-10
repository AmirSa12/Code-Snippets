import axios from "axios"
import { useState ,useEffect } from "react"
import React from "react"
import { useParams } from "react-router-dom"
import PosterDetails from "./posterDetails"
import PeopleForMovieCardExpend from "./peopleForMovieCardExpend"
import RecommendationMovieCard from "./recommendationMovieCard"
import SimilarMovies from "./similarMovies"
import ReactPlayer from 'react-player';

function Details() {

    const {movieId} = useParams()

    useEffect(()=>{
        movieDitails()
        gerRecommendation()
        getSimilarMovie()
    },[])

    const [getDT ,setGetDT] = useState([])
    const movieDitails = async()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        setGetDT(get.data)
        console.log(get.data)
    }
    
    useEffect(()=>{
      getCredits()
    },[getDT])

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

    const [getActor ,setGetActor] = useState([])
    const getCredits = async ()=>{
      const getapi = await axios.get(`https://api.themoviedb.org/3/movie/${getDT.id}/credits?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
      console.log(getapi.data)
      setGetActor(getapi.data)
    }

    const[getRec ,setGetRec] = useState()
    const gerRecommendation = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`)
      setGetRec(get.data.results)
    }

    const [getSimilar ,setGetSimiar] = useState([])
    const getSimilarMovie = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`)
      setGetSimiar(get.data.results)
      console.log(get)
    }

    const [images ,setImages] = useState([])
    const getIMG = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
      setImages(get)
      console.log(get);
    }

    const [trailer, setTrailer] = useState("")
    const getVideo = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
      setTrailer(get.data?.results[0].key)
      console.log(get)
    }
    
    console.log(trailer)

    useEffect(()=>{
      getIMG()
      getVideo()
    },[])

    const [activeList, setActiveList] = useState("popular");

    const handleListClick = (list) => {
      setActiveList(list);
    };

    const MostPopular = () => {
      return (
        <div>
          <h1>1</h1>
        </div>
      )
    }

    const VideoPlayer = () => {
      return (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          controls={true}
          width="640"
          height="360"
          config={{
            file: {
              attributes: {
                codecs: "vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
                type: "video/mp4; codecs=vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
              }
            },
          }}
        />
      );
    };

    const Videos = () => {
      return (
        <VideoPlayer/>
      )
    }

    const Backdrops = () => {
      return (
        <div>
          <h1>3</h1>
        </div>
      )
    }

    const Posters = () => {
      return (
        <div>
          <h1>4</h1>
        </div>
      )
    }


  return (
    <div className="mainDT">
      <PosterDetails getDT={getDT}/>
      <div className="under-poster">
        <div className="left-details">
          <div className="orgenization">
            <h2 className="introducer1">Top Billed Cast</h2>
            <div className="actor-part">
              {getActor?.cast?.map((act)=>(
                  <PeopleForMovieCardExpend actors={act}/>
              ))}
            </div>
          </div>
          <div className="hr"></div>
          <div className="Recommendations">
            <div className="Recommendation">
              <p className="introducer2">Recommendations</p>
            </div>
            <div className="orgenization-recommends">
              {getRec?.map((recommend)=>(
                <RecommendationMovieCard recommend={recommend}/>
              ))}
            </div>
          </div>
          <div className="media-section" >
            <h3 id="media-title">Media</h3>
            <ul>
              <li onClick={() => handleListClick("popular")}>Most Popular</li>
              <li onClick={() => handleListClick("video")}>Videos</li>
              <li onClick={() => handleListClick("backdrop")}>Backdrops</li>
              <li onClick={() => handleListClick("poster")}>Posters</li>
            </ul>
            {activeList === "popular" && <MostPopular/>}
            {activeList === "video" && <Videos/>}
            {activeList === "backdrop" && <Backdrops/>}
            {activeList === "poster" && <Posters/>}
          </div>
          <div className={`${getSimilar.length > 1 ? "hr1" : "none"}`}></div>
          <div className={`${getSimilar.length > 1 ? "similars" : "none"}`}>
            <div className="similar">
              <p className={`${getSimilar.length > 1 ? "introducer2" : "none"}`}>Similar Movies</p>
            </div>
            <div className="orgenization-recommends">
              {getSimilar?.map((simi)=>(
                <SimilarMovies sim={simi}/>
              ))}
            </div>
          </div>
        </div>
        <div className="right-details"></div>
      </div>
    </div>
  )
}

export default Details   