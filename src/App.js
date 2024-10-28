import React, { Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage'

export function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          {
            routes.map((route) =>{
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return(
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                 } />
              )
            })
          }
          <Route path="/movie/detail/:movieId" element={<MovieDetailPage />} />
        </Routes>
      </Router>
      
    </div>
  )
}


export default App;
