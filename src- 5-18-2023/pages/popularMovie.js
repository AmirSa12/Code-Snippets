import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {useState , useEffect , useRef ,useCallback} from 'react'
import { RangeSlider, SliderLabel } from "@progress/kendo-react-inputs";
import { MainPage } from '../pages/MainPage'
import axios from 'axios'
import Navbar from '../Component/navbarAndDependencies/navbar'
import { MovieCard } from '../Component/MovieCard'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Spinner from './../Component/Spinner'



export default function PopularMovie() {
    const[searchBox , setSearchBox] = useState(false)
    const [onClick , setOnClick] = useState(false)
    const [onClickOne , setOnClickOne] = useState(false)
   

    // genres

    // const[gen , setGen] = useState([])
    // const [selectGen , setSlectGen] = useState({})
    // const chooseGenres = async ()=>{
    //     const api1 = `https://api.themoviedb.org/3/discover/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&with_genres=${selectGen}`
    //     const get = fetch(api1)
    //     const res = (await get).json()
    //     setGen(res.result)
    // }
    
    const [isLoading, setIsLoading] = useState(false)
    const [genBring, setGenBring] = useState([])
    const BringGenres = async ()=>{
        const data1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        setGenBring(data1.data.genres)
    }

    const [selectedGenres , setSelectedGenres] = useState([])
    const handleAdd = (gen)=>{
        setSelectedGenres([...selectedGenres ,gen])
        setGenBring(genBring.filter((g)=> g.id !== gen.id ))
        setPage(1)
    }

    const handleRemove = (gen)=>{
        setGenBring([...genBring ,gen])
        setSelectedGenres(selectedGenres.filter((rem)=> rem.id !== gen.id))
        getGenIdRemove(selectedGenres)
    }

        
    const [getId, setGetId] = useState([])
    const getGenIdAdd = ()=>{
        if(selectedGenres.length < 1) return 
        const GId = selectedGenres.map(i => i.id)
        const res = GId.reduce((acc,cur)=> acc+','+cur)
        setGetId([...getId ,res])
    }

    const getGenIdRemove = (sel)=>{
        setGetId(getId.filter((id)=> id === sel.id))
    }
    //genres

    //certification
    const [getCerM , setGetCerM] = useState([])
    const GenCertificationM = async ()=>{
        const get = await axios.get('https://api.themoviedb.org/3/certification/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e')
        setGetCerM(get.data.certifications.US)
        // console.log(get.data.certifications)
    }


    const [selectedAddCer , setSelectedAddCer] = useState([])
    const handleAddCer = (cer)=>{
        setSelectedAddCer([...selectedAddCer ,cer])
        setGetCerM(getCerM.filter((C)=> C.certification !== cer.certification))
    }

    const handleRemoveCer = (cer)=>{
        setGetCerM([...getCerM ,cer])
        setSelectedAddCer(selectedAddCer.filter((S)=> S.certification !== cer.certification))
        removeCerReduce(selectedAddCer)
    }

    const[addCerReduce ,setAddCerReduce] = useState([])
    const addReduceCer = ()=>{
        if(selectedAddCer.length < 1) return
        const select = selectedAddCer.map((C)=> C.certification)
        const done = select.reduce((acc, cur)=> acc +','+cur)
        setAddCerReduce([...addCerReduce ,done])
    }

    const removeCerReduce = (selectedAddCer)=>{
        setAddCerReduce(addCerReduce.filter((Cer)=> Cer === selectedAddCer.certification ))
    }
    
    //certification


    const[popM , setPopM] = useState([])
    const [page, setPage] = useState(1)
    const popularM = async (pageNumber)=>{
        // const nextPage = page + 1;
        const get = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&with_genres=${getId}&certification=${addCerReduce}&primary_release_date.gte=${formattedStringDate}&primary_release_date.lte=${formattedStringDateEnd}&certification_country=US&page=${pageNumber}`);
        // setPopM(get.data.results)
        // setPopM((prevMovies) => [...prevMovies, ...get.data.results]);
        // setPage(nextPage);
        return get.data.results
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(null, args);
          }, delay);
        };
      };

    const handleScroll = debounce(() => {
        const isNearBottom =
          window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight - 500;
      
        if (isNearBottom && !isLoading) {
            // console.log(page)
            // console.log(getId)
            // popularM();
            setIsLoading(true)
            setPage((prevPage) => prevPage + 1);
        }
      }, 500);

      const handleGenreChange = async (selectedGenre) => {
        const initialMovies = await popularM(1);
        setPopM(initialMovies);
      
        // Update the genre ID state
        getId(selectedGenre);
        setPage(1); // Reset the page number to 1
      };

      const handleCertificationChange = async (selectedCertification) => {
        const initialMovies = await popularM(1);
        setPopM(initialMovies);
      
        // Update the certification state
        setSelectedAddCer(selectedCertification);
        setPage(1); // Reset the page number to 1
      };

      const handleYearChange = async () => {
        const initialMovies = await popularM(1)
        setPopM(initialMovies)

        formattedStringDate = stringDate.slice(1, 11) 
        formattedStringDateEnd = stringDateEnd.slice(1, 11)
        setPage(1)
      }

      const handleFilterChanges = async () => {
        const initialMovies = await popularM(1)
        setPopM(initialMovies)

        // calling the functions that handle filtering change
        handleCertificationChange(selectedAddCer)
        handleGenreChange(selectedGenres)
        handleYearChange(startYear, endYear)

        setPage(1)
      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        const initialLoad = async () => {
          const initialMovies = await popularM(1);
          setPopM(initialMovies);
        };
      
        initialLoad();
      }, []);

    useEffect(()=>{
        BringGenres()
        GenCertificationM()
    },[])

    useEffect(() => {
        if (page > 1) {
          const fetchMovies = async () => {
            const newMovies = await popularM(page);
            setPopM((prevMovies) => [...prevMovies, ...newMovies]);
          };
      
          fetchMovies();
        }
      }, [page]);


    // THE CODE BELOW IS UPDATED BUT I DIDNT LIKE HOW IT FUNCTIONS, SO I CHOSE THE PREVIOUS ONE, I DONT KNOW HOW IT WORKS!!

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //       setIsLoading(true); // Set loading state to true before fetching movies
    //       const newMovies = await popularM(page);
    //       setPopM((prevMovies) => [...prevMovies, ...newMovies]);
    //       setIsLoading(false); // Set loading state to false after movies are fetched
    //     };
      
    //     if (page > 1) {
    //       fetchMovies();
    //     }
    //   }, [page]);
      


    useEffect(()=>{
        getGenIdAdd()
    },[selectedGenres])

    useEffect(()=>{
        popularM()
    },[getId])

    useEffect(()=>{
        addReduceCer()
    },[selectedAddCer])

    useEffect(()=>{
        popularM()
    },[addCerReduce])

    useEffect(()=>{
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }, [handleFilterChanges()])

    const [startYear, setStartYear] = useState(new Date("1950-01-01"))
    const [endYear, setEndYear] = useState(new Date())
    // setStartYear("1970-01-01")

    const starYearGetter = (date) =>{
        setStartYear(date)
        // console.log(startYear)
        // console.log(startYear)
        // console.log(date)
        // console.log(typeof(startYear))
    }

    const stringDate = JSON.stringify(startYear)
    // console.log(stringDate)
    let formattedStringDate = stringDate.slice(1, 11)
    // console.log(formattedStringDate)


    // END YEAR GETTER

    const endYearGetter = (date) =>{
        setEndYear(date)
        // console.log(startYear)
        // console.log(endYear)
        // console.log(date)
        // console.log(typeof(formattedStringDateEnd))
    }

    const stringDateEnd = JSON.stringify(endYear)
    // console.log(stringDateEnd)
    let formattedStringDateEnd = stringDateEnd.slice(1, 11)
    // console.log(formattedStringDateEnd)

    const filterByYear = async () => {
        // setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1&primary_release_date.gte=${formattedStringDate}&primary_release_date.lte=${formattedStringDateEnd}&vote_count.gte=500&vote_average.gte=0&vote_average.lte=7`);
        // console.log(response);
        // setLoading(false);
      };

      const filterYearSearchBtn = () => {
        filterByYear()
      }

    return(
        <div className='main'>
            <Navbar/>
            <div className="position">
                <div className="body">
                    <div className="left-side">
                        <p className='info'>Popular Movie</p>
                        <div className="filterBox">
                            <div className="pragraph">
                                <div className="topType"></div>
                                <div onClick={()=>{setOnClickOne(!onClickOne) }} className={`firstShow ${onClickOne? 'noOpenLa' : 'openLa'}`}>
                                    <h3>Filters</h3>
                                    <HiOutlineChevronRight className='cerculate'/>
                                </div>
                                <div className={`secondShow ${onClickOne? 'openLa' : 'noOpenLa'}`}>
                                    <div id="same" onClick={()=>{setOnClickOne(!onClickOne) }}>
                                        <h3>Filters</h3>
                                        <HiOutlineChevronDown className='cerculate1'/>
                                    </div>
                                    <div className="movDate">
                                        <p id='Air-date'>Air Date</p>
                                        <div className="input-date-1">
                                            <p id='form-p'>from</p>
                                            {/* <input type="date" onChange={(e)=>starYearGetter(e)}/> */}
                                            <DatePicker selected={startYear} onChange={starYearGetter}/>
                                        </div>
                                        <div className="input-date-2">
                                            <p id='to-p'>to</p>
                                            <DatePicker selected={endYear} onChange={endYearGetter}/>
                                        </div>
                                        <div className="filterbtn">
                                            <button onClick={filterYearSearchBtn}>Search</button>
                                        </div>
                                        <div id="bottom-border"></div>
                                    </div>
                                    <div className="movGenres">
                                        <div className="denres-title">
                                            <p>Genres</p>
                                        </div>
                                        {selectedGenres && selectedGenres.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass2' onClick={()=>{handleRemove(gen)}}>
                                                {gen.name}
                                            </div>
                                        ))}
                                        {genBring.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass' onClick={()=>{handleAdd(gen)}}>
                                                {gen.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div id="bottom-border2"></div>
                                    <div className="movCertification">
                                        <div className="Certification-title">
                                            <p>Certification</p>
                                        </div>
                                        <div>
                                            {selectedAddCer.map((cer)=>(
                                                <div className='certificate2' onClick={()=>{handleRemoveCer(cer)}}>
                                                    {cer.certification}
                                                </div>
                                            ))}

                                            {getCerM.map((cer)=>(
                                                <div className='certificate' onClick={()=>{handleAddCer(cer)}}>
                                                    {cer.certification}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="distance"></div>
                                </div>
                                <div className="searchBTN" onClick={handleFilterChanges}>
                                    <p id='search-click'>Search</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className='app'>
                            <div className='container'>
                                {popM.length> 0 && popM.map((M )=>{
                                        return  <MovieCard movie={M}/>
                                })}
                                {isLoading && <Spinner />}
                            </div>           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}