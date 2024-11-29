import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import MovieDetailComponent from '../../components/MovieDetailComponent/MovieDetailComponent'
import newRequest from '../../utils/request'
import { useParams } from 'react-router-dom'

function MovieDetailPage() {
    const [movie, setMovie] = useState([])
    const params = useParams()

    const id = params.movieId;
    const fetchMovie = async() =>{
      try{  
        const reponse = await newRequest.get(`/api/movie/get/movie/${id}`)
        setMovie(reponse.data.movie)
      }
      catch(error){
        console.error(error)
      }
    }
    useEffect(()=>{
      fetchMovie()
    }, [id])
  return (
    <div >
        <HeaderComponent/>
        <div style={{padding: '0 120px', backgroundColor: '#0f172a',height: '5000px', marginTop: '91.5px' }}>
          <MovieDetailComponent movie={movie} idParams={id}/>
        </div>
    </div>
  )
}

export default MovieDetailPage