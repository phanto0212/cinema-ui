import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import MovieDetailComponent from '../../components/MovieDetailComponent/MovieDetailComponent'
import newRequest from '../../utils/request'
import { useParams } from 'react-router-dom'
import Snowfall from '../../components/SnowComponent/Snowfall'
import Comments from '../../components/CommentCoponent/CommentComponent'
import CommentsList from '../../components/CommentLists/ComponentList'
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import styled from 'styled-components';

// Thêm component này ở đầu file
const ResponsiveContainer = styled.div`
  padding: 0 120px;
  background-color: #292e5d;
  min-height: 100vh;
  margin-top: 91.5px;
  
  @media (max-width: 1024px) {
    padding: 0 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 15px;
    margin-top: 70px;
  }
`;
function MovieDetailPage() {
    const [movie, setMovie] = useState([])
    const params = useParams()
    const [changeComment, setChangeComment] = useState(0)
    const [comments, setComments] = useState([])
    const id = params.movieId;
    useEffect(() => {
          const socket = new SockJS('https://cinema-be-1.onrender.com/ws'); // Kết nối WebSocket
          const stompClient = new Client({
              webSocketFactory: () => socket,
              debug: (str) => console.log('WebSocket Log:', str), // Log WebSocket events
          });
    
          stompClient.onConnect = () => {
              console.log(`Connected to WebSocket for comment ${id}`);
    
              // Subscribe đến topic `/topic/payment/{ticketId}`
              stompClient.subscribe(`/topic/comment/${id}`, (message) => {
                setChangeComment(prev => prev + 1)
              });
          };
    
          stompClient.onStompError = (frame) => {
              console.error('STOMP Error:', frame);
          };
    
          stompClient.activate(); // Bắt đầu kết nối
    
          // Cleanup khi component unmount
          return () => {
              if (stompClient.active) {
                  stompClient.deactivate();
              }
          };
      }, [id]);
      const fetchComment = async (id) => {
        try {
          const response = await newRequest.get(`/api/comment/get/all/comment/${id}`);
          console.log('binh luan',response.data); // Log toàn bộ response để kiểm tra cấu trúc
          setComments(response.data.comments || []);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        fetchComment(id); // Đảm bảo gọi fetchComment với id
        console.log(comments);
      }, [changeComment, id]); // Thêm id vào dependency array
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
    useEffect(() => {
      window.scrollTo(0, 0); // Cuộn về đầu trang
    }, []);
  return (
    <>
    <Snowfall/>
    <div >
        <HeaderComponent/>
        <ResponsiveContainer>
          <MovieDetailComponent movie={movie} idParams={id}/>
          <div style={{marginTop: '300px'}}>
            <Comments movie_id = {id} />
            <CommentsList changeComment={changeComment} comments={comments} />
          </div>
        </ResponsiveContainer>
    </div>
    </>
  )
}

export default MovieDetailPage