import React, {useContext ,useState ,useEffect} from 'react'
import ResultContext from '../contextThings'
import Navbar from '../navbarAndDependencies/navbar'
import SearchBoxResultsChild from './searchBoxResultsChild'
import ShowResults from './showResults'

function SearchBoxResultsPage() {

  const [getResult] = useContext(ResultContext)
  const [getTvResult] = useContext(ResultContext)

  


  // useEffect(()=>{
  //   ResultOrgenize()
  // },[showTvMovie])

  // const checkPerson = (ans)=>{
  //   if(ans.id.length > 6 ) return
  // }
  console.log(getResult.id);

  const [showTvMovie ,setShowTvMovie] =useState(true)
  console.log(showTvMovie)

  useEffect(()=>{
    
  },[setShowTvMovie])

  return (
    <div className='SBRP_main'>
      <Navbar/>
      <div className="changerTM">
        <div className="changBody">
          <p className='changerP' onClick={()=>{setShowTvMovie(true)}}>Movie</p>
          <p className='changerP'onClick={()=>{setShowTvMovie(false)}}>TV show</p>
        </div>
      </div>
      <FinalResult showTvMovie={showTvMovie}/>
    </div>
  )

  function FinalResult({showTvMovie}) {
    return <div>{showTvMovie ? "Movies" : "TV Shows"}</div>
  }
}

export default SearchBoxResultsPage