import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const PageWrapper = styled.div`
  background-color:#292e5d;
  background-size: 200% 200%;
  animation: ${gradient} 15s ease infinite;
  min-height: 100vh;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 35%, rgba(41, 46, 93, 0.8) 0%, transparent 25%),
      radial-gradient(circle at 75% 60%, rgba(30, 31, 53, 0.8) 0%, transparent 25%);
    pointer-events: none;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1200px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin: 60px 0 40px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: ${props => props.delay || '0.2s'};
  
  &::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, #ff7401, #ff9249);
    border-radius: 2px;
  }
  
  &::after {
    content: '🎬';
    position: absolute;
    font-size: 24px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 40px 0 30px;
    
    &::before {
      width: 60px;
      height: 3px;
    }
  }
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 35px;
  margin-top: 40px;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

export const MovieCardWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${props => props.delay};
  transition: all 0.3s ease;
  overflow: visible;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    z-index: 10;
  }
`;

export const FeaturedSection = styled.section`
  margin: 60px 0;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.1s;
`;

export const FeaturedMovieCard = styled.div`
  display: flex;
  background-color:#292e5d
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff7401, transparent);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FeaturedImage = styled.div`
  flex: 0 0 40%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 200px;
  }
`;

export const FeaturedContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  
  
  h3 {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    
    h3 {
      font-size: 24px;
    }
  }
`;

export const FeaturedBadge = styled.span`
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(255, 116, 1, 0.3);
`;

export const FeaturedButton = styled.button`
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-start;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 116, 1, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(255, 116, 1, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-30deg);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

export const ComingSoonSection = styled.section`
  margin: 80px 0;
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.3s;
`;

export const ComingSoonBanner = styled.div`
  background: linear-gradient(135deg, rgba(255, 116, 1, 0.2), rgba(41, 46, 93, 0.8));
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  h3 {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    max-width: 700px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background: rgba(255, 116, 1, 0.3);
    border-radius: 50%;
    top: -50px;
    right: -50px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgba(41, 46, 93, 0.4);
    border-radius: 50%;
    bottom: -30px;
    left: 10%;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    
    h3 {
      font-size: 24px;
    }
    
    p {
      font-size: 14px;
    }
  }
`;

export const PromoBadge = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #5D4037;
  font-size: 14px;
  font-weight: 800;
  padding: 5px 15px;
  border-radius: 30px;
  transform: rotate(5deg);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 12px;
    top: 15px;
    right: 15px;
    padding: 4px 12px;
  }
`;

export const FloatingIcon = styled.div`
  position: absolute;
  font-size: ${props => props.size || '30px'};
  color: rgba(255, 255, 255, 0.5);
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  z-index: 1;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

export const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 30px;
  gap: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const CategoryTab = styled.button`
  background: ${props => props.active ? 'linear-gradient(90deg, #ff7401, #ff9249)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(90deg, #ff7401, #ff9249)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 12px;
  }
`;

export const NewsletterSection = styled.section`
  margin: 80px 0;
  padding: 50px;
  background: rgba(30, 31, 53, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.4s;
  
  h3 {
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    
    h3 {
      font-size: 24px;
    }
    
    p {
      font-size: 14px;
    }
  }
`;

export const SubscribeForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SubscribeInput = styled.input`
  flex: 1;
  height: 50px;
  padding: 0 20px;
  border-radius: 8px 0 0 8px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 576px) {
    border-radius: 8px;
    height: 45px;
  }
`;

export const SubscribeButton = styled.button`
  height: 50px;
  padding: 0 25px;
  border-radius: 0 8px 8px 0;
  border: none;
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateX(2px);
    box-shadow: 0 5px 15px rgba(255, 116, 1, 0.3);
  }
  
  @media (max-width: 576px) {
    border-radius: 8px;
    height: 45px;
  }
`;