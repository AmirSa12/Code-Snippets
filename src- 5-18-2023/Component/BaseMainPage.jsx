import { FaSearch } from 'react-icons/fa'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import react, {useState , useEffect , useRef ,useContext} from 'react'
import { RangeSlider, SliderLabel } from "@progress/kendo-react-inputs";
import Navbar from './navbarAndDependencies/navbar';
import { Link } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import axios from 'axios'
import PopularMovie from '../pages/popularMovie';
import PeopleList from './PeopleList';



export const BaseMainPage = ()=>{

    const[searchBox , setSearchBox] = useState(false)
    const [onClick , setOnClick] = useState(false)
    const [onClickOne , setOnClickOne] = useState(false)
    
    // scroll
    const [show, setShow] = useState(false);

    useEffect(()=>{
        function scrollEventThrottle(fn) {
            let last_known_scroll_position = 0;
            let ticking = false;
            window.addEventListener("scroll", function () {
              let previous_known_scroll_position = last_known_scroll_position;
              last_known_scroll_position = window.scrollY;
              if (!ticking) {
                window.requestAnimationFrame(function () {
                  fn(last_known_scroll_position, previous_known_scroll_position);
                  ticking = false;
                });
                ticking = true;
              }
            });
          }
          
          // ## function invocation
          scrollEventThrottle((scrollPos, previousScrollPos) => {
              if (previousScrollPos > scrollPos) {
                setShow(show)
              } else {
                setShow(!show)
              }
          });
    },[])
    // scroll


    // genres
    const[gen , setGen] = useState([])
    const [selectGen , setSlectGen] = useState({})
    const chooseGenres = async ()=>{
        const api1 = `https://api.themoviedb.org/3/discover/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&with_genres=${selectGen}`
        const get = fetch(api1)
        const res = (await get).json()
        setGen(res.result)
        console.log(gen)
    }

    

    const [genBring, setGenBring] = useState([])
    const BringGenres = async ()=>{
        const data1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        setGenBring(data1.data.genres)
        console.log(genBring)
    }

    const [selectedGenres , setSelectedGenres] = useState([])
    const handleAdd = (gen)=>{
        setSelectedGenres([...selectedGenres ,gen])
        setGenBring(genBring.filter((g)=> g.id !== gen.id ))
    }

    const handleRemove = (gen)=>{
        setGenBring([...genBring ,gen])
        setSelectedGenres(selectedGenres.filter((rem)=> rem.id !== gen.id))
    }
    
    useEffect(()=>{
        // CertificationTvMovie()
        BringGenres()
        GenCertificationM()
        // GenCertificationT()
    },[])

    // const genStyles = {
    //     color: 'black',
    //     fontSize: '15px',
    //     borderRadius: '20px',
    //     border: '1px solid rgb(0,0,0,.4)',
    //     padding: '4px',
    //     margin: '5px',
    //     display: 'inline-block',
    //     textDecoration: 'none',
    //     cursor: 'pointer'
    // }

    //genres

    //certification
    const [getCerM , setGetCerM] = useState([])
    // const [getCerT , setGetCerT] = useState([])

    const GenCertificationM = async ()=>{
        const get = await axios.get('https://api.themoviedb.org/3/certification/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e')
        setGetCerM(get.data.certifications.SK)
        console.log(get.data.certifications.SK);
    }

    const [selectedAddCer , setSelectedAddCer] = useState([])
    const handleAddCer = (cer)=>{
        setSelectedAddCer([...selectedAddCer ,cer])
        setGetCerM(getCerM.filter((C)=> C.certification !== cer.certification))
    }

    const handleRemoveCer = (cer)=>{
        setGetCerM([...getCerM ,cer])
        setSelectedAddCer(selectedAddCer.filter((S)=> S.certification !== cer.certification))
    }
    

    
    // const GenCertificationT = async ()=>{
    //     const get = await axios.get('https://api.themoviedb.org/3/certification/tv/list?api_key=1b6ccfb407b0626e097c87368fba764e')
    //     setGetCerT(get.data.certifications.SK)
    //     console.log(get.data.certifications.SK);
    // }
    const CertificationTvMovie = ()=>{

        
        const GenCertificationM = async ()=>{
            const get = await axios.get('https://api.themoviedb.org/3/certification/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e')
            setGetCerM(get.data.certifications.SK)
            console.log(get.data.certifications.SK);
        }
        GenCertificationM()
    
       
        const GenCertificationT = async ()=>{
            const get = await axios.get('https://api.themoviedb.org/3/certification/tv/list?api_key=1b6ccfb407b0626e097c87368fba764e')
            console.log(get.data.certifications.SK);
        }

        GenCertificationT()
        return(
            <div>
                {getCerM.map((cer , id)=>(
                    <div key={id} className='certificate' onClick={()=>{}}>
                        {cer?.certification}
                    </div>
                ))}
            </div>
        )

    }
  
    
    return(
        <div className='main'>
            <Navbar show={show} searchBox={searchBox} setSearchBox={setSearchBox}/>
            <div className="position">
                <div className="body">
                    <div className="left-side">
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
                                            <input type="date" />
                                        </div>
                                        <div className="input-date-2">
                                            <p id='to-p'>to</p>
                                            <input type="date" />
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
                                        <div id="distance"></div>
                                        <div id="bottom-border"></div>
                                    </div>
                                    <div className="movUserScore">
                                        <div className="userScore-title">
                                            <p>User Score</p>
                                        </div>
                                        <div className="userScore-box">
                                            <RangeSlider
                                                className='import-input'
                                                defaultValue={{
                                                    start: 0,
                                                    end: 10,
                                                }}
                                                step={1}
                                                min={0}
                                                max={10}
                                                >
                                                {[0,1,2,3,4,5,6,7,8,9,10].map((perc, i) => (
                                                    <SliderLabel key={i} position={perc}>
                                                    {perc.toString()}
                                                    </SliderLabel>
                                                ))}
                                            </RangeSlider>
                                        </div>
                                    </div>
                                    <div id="distance"></div>
                                    <div id="bottom-border"></div>
                                    <div className="movLanguage">
                                        <div className="language-title">
                                            <p>Language</p>
                                        </div>
                                        <div className="language-box" onClick={()=>{setOnClick(!onClick)}}>
                                            <p className='countries'>sdfsd</p>
                                            <HiOutlineChevronDown className='cerculate2'/>
                                        </div>
                                        <div className={`after-language-box ${onClick? 'openLa' : 'noOpenLa'}`}>
                                            <input type="text"id='language-input'/>
                                            <FaSearch id='icon-22'/>
                                            <div className="select-countrys"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="searchBTN">
                                    <p id='search-click'>Search</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">{CertificationTvMovie}</div>
                </div>
            </div>
        </div>
    )
}