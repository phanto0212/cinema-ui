import React, { useEffect, useState } from 'react'
import SlideComponent from '../../components/SlideComponent/SlideComponent';
import slide0 from '../../assets/images/slide0.png';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import { TitleMovie } from './style';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';


function Hompage() {
  const Navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const fetchMovies =  async() =>{
    try{
      const reponse = await newRequest.get('/api/movie/all/show/now')
      setMovies(reponse.data.movies || [])
    }
    catch(error){
      console.error(error)

    }
  }
  useEffect(()=>{
     fetchMovies()
  }, [])
  return (
    <div style={{padding: '0 120px', backgroundColor: '#0f172a',height: '3000px' }}>
      <SlideComponent arrImages = {[slide0, slide1, slide2, slide3, slide4]} />
      <TitleMovie>PHIM ĐANG CHIẾU</TitleMovie>
      <div style={{marginTop: '60px',  display: 'flex',flexWrap: 'wrap', alignItems: 'center', gap: '25px'}} >
        {movies.map((movie, index) =>(
          <CardComponent movie={movie} key={index} onClick={()=> Navigate(`/movie/detail/${movie.id}`)} ></CardComponent>
        ))}
      </div>
  
    </div>
  )
}

export default Hompage