import './App.css';
import "./movieCard.css"
import './Component/PeopleList.css'
import './Component/PersonDetails.css'
import { MainPage } from './pages/MainPage';
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import { BaseMainPage } from './Component/BaseMainPage';
import PopularMovie from './pages/popularMovie';
import PeopleList from './Component/PeopleList';
import Details from './Component/movieCardExpand/details';
import SearchBoxN from './Component/navbarAndDependencies/searchBoxN';
import SearchBoxResultsPage from './Component/searchBoxResults/searchBoxResultsPage';
import ErrorPage from './ErrorPage';
import Popular from './Component/Popular';
import PersonDetails from './Component/PersonDetails';
import Navbar from './Component/navbarAndDependencies/navbar';
import { useEffect, useState } from 'react';
import Footer from './Component/Footer';

function App() {

  const [getSearchResult , setGetSearchResult] = useState([])
  
  const getData = (get)=>{
    setGetSearchResult(get)
    console.log(get)
  }

  return (
    <div className="App">
      <Router>
      <Navbar/>
        <SearchBoxN setGetSearchResult={setGetSearchResult} getSearchResult={getSearchResult} getData={getData}/>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/BaseMainPage' element={<BaseMainPage/>} />
          <Route path='/pages/popularMovie' element={<PopularMovie/>} />
          <Route path='/popular' element={<Popular/>} />
          <Route path='/details/:movieId' element={<Details/>} />
          <Route path='/popular/:personId' element={<PersonDetails/>} />
          <Route path='/searchBoxN' element={<SearchBoxN />}/>
          <Route path='/searchBoxResultsPage' element={<SearchBoxResultsPage getSearchResult={getSearchResult}/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
  