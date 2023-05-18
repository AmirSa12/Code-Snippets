import React from 'react'
import { useState ,useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import PopularMovie from '../../pages/popularMovie';
import { Link } from 'react-router-dom';
import SearchBoxN from './searchBoxN';



export default function Navbar() {
    const[open , setOpen] = useState(false)
    const[open1 , setOpen1] = useState(false)
    const[open2 , setOpen2] = useState(false)
     
    const[searchBox , setSearchBox] = useState(false)
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

  return (
    <div className={`makeIt ${show? 'scrDown': 'scrUp'}`}>
        <div className='navbar' >
            <div className="lable">
                <h1>
                    <span id="ami1">A</span>
                    <span id="ami2">Z</span>
                    <span id="ami3">P</span>
                    <span id="ami4">M</span>
                </h1>
                <div className="shape"></div>
            </div>
            <div className="option1">
                <div className="divid1" onMouseEnter={()=>{setOpen(!open)}} onMouseLeave={()=>{setOpen(!open)}}>
                    <div className="menu"><p id='menu-p'>movies</p> </div>
                    <div className={`under1 ${open? 'active' : 'inactive'}`} >
                        <Link to={'../pages/popularMovie'} className='under-p'id='selected1'>Populer</Link>
                        <a href='/' className='under-p'>New playing</a>
                        <a href='/' className='under-p'>Up coming</a>
                        <a href='/' className='under-p' id='selected2'>Top rated</a>
                    </div>
                </div>
                <div className="divid2" onMouseEnter={()=>{setOpen1(!open1)}} onMouseLeave={()=>{setOpen1(!open1)}}>
                    <div className="menu"><p id='menu-p'>TVshows</p> </div>
                    <div className={`under2 ${open1? 'active1' : 'inactive1'}`} >
                        <a href='/' className='under-p'id='selected1'>Populer</a>
                        <a href='/' className='under-p'>Airing today</a>
                        <a href='/' className='under-p'>On TV</a>
                        <a href='/' className='under-p' id='selected2'>Top rated</a>
                    </div>
                </div>
                <div className="divid3" onMouseEnter={()=>{setOpen2(!open2)}} onMouseLeave={()=>{setOpen2(!open2)}}>
                    <div className="menu"><p id='menu-p'>people</p></div>
                    <div className={`under3 ${open2? 'active2' : 'inactive2'}`} >
                        <a href='#' className='under-p make'id='selected1'>Populer people</a>                            
                    </div>
                </div>
                <div className="divid4">
                    <div className="menu"><p id='menu-p'>more</p></div>
                    <div className="under4"></div>
                </div>
            </div>
            <div className="option2">
                <div id='nav-end'>
                    <div id="userAcount"><a href="#" id="APadding">A</a></div>
                    <div className="changeSearch">
                        <div id="search">
                            <FaSearch id='second-icon' onClick={()=>{setSearchBox(!searchBox)}} className={`${searchBox? 'hide' : 'show'}`}/>
                        </div>
                        <div id="search1"> 
                            <RiCloseLine id='second-hide-icon'onClick={()=>{setSearchBox(!searchBox)}} className={`${searchBox? 'show' : 'hide'}`}/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SearchBoxN searchBox={searchBox} />
    </div>
  )
}
