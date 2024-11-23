import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import MovieDetailComponent from '../../components/MovieDetailComponent/MovieDetailComponent'
import newRequest from '../../utils/request'
import { useParams } from 'react-router-dom'

function MovieDetailPage() {
    const [movies, setMovies] = useState([])
    const params = useParams()
  
     const id = params.tourId;
    const fetchMovies = async() =>{
      try{  
        const reponse = await newRequest.get()
      }
      catch(error){
        console.error(error)
      }
    }
  return (
    <div >
        <HeaderComponent/>
        <div style={{padding: '0 120px', backgroundColor: '#0f172a',height: '4000px', marginTop: '91.5px' }}>
          <MovieDetailComponent/>
        </div>
    </div>
  )
}

export default MovieDetailPage