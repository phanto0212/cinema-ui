import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import MovieDetailComponent from '../../components/MovieDetailComponent/MovieDetailComponent'

function MovieDetailPage() {
    
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