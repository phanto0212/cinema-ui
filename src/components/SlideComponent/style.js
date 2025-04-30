import Slider from "react-slick";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const SliderComponents = styled(Slider)`
  position: relative;
  margin-top: 91.5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  .slick-track {
    display: flex !important;
  }
  
  .slick-slide {
    height: auto;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
      z-index: 1;
    }
  }
  
  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 8s ease-in-out;
    
    @media (min-width: 992px) {
      height: 70vh;
      max-height: 700px;
      min-height: 450px;
    }
    
    @media (max-width: 991px) {
      height: 60vh;
      min-height: 400px;
    }
    
    @media (max-width: 768px) {
      height: 50vh;
      min-height: 350px;
    }
    
    @media (max-width: 576px) {
      height: 40vh;
      min-height: 300px;
    }
  }
  
  /* Active slide zoom effect */
  .slick-active img {
    transform: scale(1.05);
  }

  /* Dots styling */
  .slick-dots {
    bottom: 20px;
    z-index: 10;
    
    li {
      margin: 0 6px;
    }
    
    li button:before {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      opacity: 0.5;
      transition: all 0.3s ease;
    }
    
    li.slick-active button:before {
      color: #ff7401;
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  /* Arrows styling */
  .slick-arrow {
    width: 50px;
    height: 50px;
    z-index: 10;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 116, 1, 0.7);
    }
    
    &::before {
      font-size: 24px;
      opacity: 1;
      color: white;
      font-weight: bold;
    }
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      
      &::before {
        font-size: 18px;
      }
    }
    
    @media (max-width: 576px) {
      width: 35px;
      height: 35px;
      
      &::before {
        font-size: 16px;
      }
    }
  }
  
  .slick-prev {
    left: 20px;
    
    @media (max-width: 576px) {
      left: 10px;
    }
  }
  
  .slick-next {
    right: 20px;
    
    @media (max-width: 576px) {
      right: 10px;
    }
  }
`;

export const SlideContent = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  text-align: left;
  padding: 0 10%;
  z-index: 5;
  color: white;
  
  @media (max-width: 768px) {
    bottom: 60px;
    padding: 0 5%;
  }
  
  @media (max-width: 576px) {
    bottom: 50px;
  }
`;

export const SlideTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
  opacity: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.3s;
  
  @media (max-width: 992px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
`;

export const SlideSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  opacity: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.6s;
  
  @media (max-width: 992px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
    display: none;
  }
`;

export const SlideButton = styled.button`
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  opacity: 0;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s forwards, ${slideUp} 0.8s forwards;
  animation-delay: 0.9s;
  box-shadow: 0 4px 15px rgba(255, 116, 1, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 116, 1, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-25deg);
    transition: all 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 10px 22px;
    font-size: 0.9rem;
    margin-top: 15px;
  }
  
  @media (max-width: 576px) {
    padding: 8px 18px;
    font-size: 0.8rem;
    margin-top: 10px;
  }
`;

export const SlideContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  z-index: 1;
`;

export const SlideTag = styled.span`
  display: inline-block;
  background: #ff7401;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 4px 10px;
    margin-bottom: 10px;
  }
`;