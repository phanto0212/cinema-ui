import React, { useEffect, useState } from 'react'
import { ContainerTitle, KindSelect, Movietitle, Wrapper } from './style';
import CardComponent from '../../components/CardComponent/CardComponent';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';
import Snowfall from '../../components/SnowComponent/Snowfall';

function MovieAllPage() {
    const Navigate = useNavigate()
    const [selectedType, setSelectedType] = useState("now_showing");
    const [movies, setMovies] = useState([])
    const handleChange = (e) => {
      setSelectedType(e.target.value);
      // Call API or handle data fetch based on selected option here
    };
    const fetchMovie = async()=>{
      try{
          const reponse = await newRequest.get('/api/movie/all');
          setMovies(reponse.data.movies || [])
      }
      catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchMovie() 
    },[])
  return (
    <>
    <Snowfall/>
    <div style={{padding: '0 120px', backgroundColor: '#292e5d',height: '4000px', marginTop: '91.5px' }}>
       <Wrapper>
          <ContainerTitle>
             <Movietitle>PHIM ĐANG CHIẾU</Movietitle>
             <KindSelect value={selectedType} onChange={handleChange}>
               <option value="now_showing">Phim Đang Chiếu</option>
               <option value="coming_soon">Phim Sắp Chiếu</option>
             </KindSelect>
          </ContainerTitle>
       </Wrapper>
       <div style={{marginTop: '20px',  display: 'flex',flexWrap: 'wrap', alignItems: 'center', gap: '25px'}} >
        {movies.map((movie, index) =>(
          <CardComponent movie={movie} key={index} onClick={()=> Navigate(`/movie/detail/${movie.id}`)} ></CardComponent>
        ))}
      </div>

    </div>
    </>
   
  )
}

export default MovieAllPage