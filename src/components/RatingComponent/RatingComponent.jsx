import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import newRequest from "../../utils/request";

// Styled components
const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  max-width: 300px;
  margin: auto;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Star = styled(FaStar)`
  font-size: 30px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#FFD700" : "#D3D3D3")};
  transition: color 0.2s;

  &:hover {
    color: #ffc107;
  }
`;

const RatingLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Rating Component
const MovieRating = ({movieId, setIsModalOpen}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const token = localStorage.getItem('authToken')

  const handleRating = (value) => {
    setRating(value);
  };
  const saveRate = async(rating,token) =>{
    try{
      const reponse = await newRequest.post('/api/rate/movie',{
        movieId: movieId,
        rate:rating 
      },{
        headers:{
            Authorization: `Bearer ${token}`,
          },
      });
      if(reponse.status === 200){
        alert(`Bạn đã đánh giá ${rating}/10!`);
        setIsModalOpen(false)
      }
      else{
        alert('danh gia that bai')
        setIsModalOpen(false)
      }
    }
    catch(error){
        console.log(error)
    }
  }
  const handleSubmit =  () => {
    saveRate(rating,token)
  };

  return (
    <RatingContainer>
      <RatingLabel>Đánh giá phim:</RatingLabel>
      <StarsContainer>
        {Array.from({ length: 10 }, (_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              active={starValue <= (hover || rating)}
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </StarsContainer>
      <SubmitButton onClick={handleSubmit}>Gửi đánh giá</SubmitButton>
    </RatingContainer>
  );
};

export default MovieRating;