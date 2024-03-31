import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Details from './pages/details/details'
import Explore from './pages/explore/explore'
import Home from './pages/home/home'
import SearchResult from './pages/searchResult/SearchResult'
import PageNotFound from './pages/404/PageNotFound'


function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) =>state.home);
  console.log(url);
  useEffect(()=>{
    fetchApiConfig();
  },[])
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration")
        .then((res)=>{
            console.log(res)

            const url = {
              backdrop: res.images.secure_base_url + 
              "original",
              poster: res.images.secure_base_url + 
              "original",
              profile: res.images.secure_base_url + 
              "original",
            }
            dispatch(getApiConfiguration(url));

        });
  }
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/:mediaType:/id' element={<Details/>}></Route>
      <Route path='/search/:query' element={<SearchResult/>}></Route>
      <Route path='/explore/:mediaType' element={<Explore/>}></Route>
    <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
    {/*<Footer/>*/}
    </BrowserRouter>
  )
}
export default App
