import { createContext, useState } from "react";

const ResultContext = createContext([])

export const ResultProvider = ({ children }) => {
    const [getResult, setGetResult] = useState([])
    const [getTvResult , setgetTvResult] = useState([])


    return (
        <ResultContext.Provider value={[getResult, setGetResult ,getTvResult ,setgetTvResult]}>
            {children}
        </ResultContext.Provider>
    )
}

export default ResultContext;