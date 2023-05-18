import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import PopularMovie from '../pages/popularMovie';
import { Link } from 'react-router-dom';



export default function Navbar({show , searchBox ,setSearchBox }) {
    const[open , setOpen] = useState(false)
    const[open1 , setOpen1] = useState(false)
    const[open2 , setOpen2] = useState(false)

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
                    <div className="menu"><a href="/" id="menu-p" >Movies</a></div>
                    <div className={`under1 ${open? 'active' : 'inactive'}`} >
                        <Link to={'../pages/popularMovie'} className='under-p'id='selected1'>Populer</Link>
                        <a href='/' className='under-p'>New playing</a>
                        <a href='/' className='under-p'>Up coming</a>
                        <a href='/' className='under-p' id='selected2'>Top rated</a>
                    </div>
                </div>
                <div className="divid2" onMouseEnter={()=>{setOpen1(!open1)}} onMouseLeave={()=>{setOpen1(!open1)}}>
                    <div className="menu"><a href="/" id="menu-p">TV Shows</a></div>
                    <div className={`under2 ${open1? 'active1' : 'inactive1'}`} >
                        <a href='/' className='under-p'id='selected1'>Populer</a>
                        <a href='/' className='under-p'>Airing today</a>
                        <a href='/' className='under-p'>On TV</a>
                        <a href='/' className='under-p' id='selected2'>Top rated</a>
                    </div>
                </div>
                <div className="divid3" onMouseEnter={()=>{setOpen2(!open2)}} onMouseLeave={()=>{setOpen2(!open2)}}>
                    <div className="menu"><a href="" id="menu-p">People</a></div>
                    <div className={`under3 ${open2? 'active2' : 'inactive2'}`} >
                        <a href='#' className='under-p make'id='selected1'>Populer people</a>                            
                    </div>
                </div>
                <div className="divid4">
                    <div className="menu"><a href="#" id="menu-p">More</a></div>
                    <div className="under4"></div>
                </div>
            </div>
            <div className="option2">
                <div id='nav-end'>
                    <div id="userAcount"><a href="#" id="APadding">A</a></div>
                    <div className="changeSearch">
                        <div id="search">
                            <a href='#'>
                                <FaSearch id='second-icon' onClick={()=>{setSearchBox(!searchBox)}} className={`${searchBox? 'hide' : 'show'}`}/>
                            </a>
                        </div>
                        <div id="search1">
                            <a href='#'>
                                <RiCloseLine id='second-hide-icon'onClick={()=>{setSearchBox(!searchBox)}} className={`${searchBox? 'show' : 'hide'}`}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`type ${searchBox? 'openSearch' : 'closeSearch'}`}>
            <div className="inType">
                <div className="inTypeInput">
                    <input placeholder='search for a movie, tv show, person'className='input1' type='text'/>
                </div>
                <div className="inTypeIcon">
                    <a href='#'><FaSearch className='inTypeIcon1'/></a>
                </div>
            </div>
        </div>
    </div>
  )
}
