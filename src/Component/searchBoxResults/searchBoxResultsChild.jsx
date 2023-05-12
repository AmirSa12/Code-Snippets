import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import ResultContext from '../contextThings'
import ShowResults from './showResults'

export default function SearchBoxResultsChild({showTvMovie}) {

    const [getResult] = useContext(ResultContext)
    const [getTvResult] = useContext(ResultContext)

  
    
  return (
    <div className="resultPart">
      {showTvMovie === true ? getResult.map((resM)=> <ShowResults res={resM}/> ): null}
      {showTvMovie === false && getTvResult.map((resT)=> <ShowResults res={resT}/>)}
    </div>
  )
}
