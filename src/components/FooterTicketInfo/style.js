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

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

export const TicketInfo = styled.div`
  background: linear-gradient(170deg, #1e1f35 0%, #292e5d 100%);
  color: white;
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 15px;
  }
`;

export const TicketInfoContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

export const MoviePoster = styled.div`
  width: 70px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 116, 1, 0.3);
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MovieInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MovieTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #ff7401, transparent);
    border-radius: 2px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  
  svg {
    margin-right: 8px;
    color: #ff7401;
    font-size: 16px;
  }
`;

export const MovieDetails = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  
  span {
    display: inline-flex;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SeatsContainer = styled.div`
  margin: 5px 0;
  
  .seat-label {
    color: rgba(255, 255, 255, 0.6);
    margin-right: 8px;
    font-size: 14px;
  }
  
  .seat-numbers {
    color: #ff7401;
    font-weight: 600;
  }
`;

export const SelectedSeats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 5px 0 10px;
  
  span {
    background: rgba(255, 255, 255, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    
    svg {
      margin-right: 5px;
      color: #ff7401;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: auto;
  
  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 15px;
  }
`;

export const TotalAmount = styled.div`
  color: #fff;
  padding: 10px 5px;
  font-weight: 500;
  font-size: 16px;
  text-align: right;
  margin-bottom: 10px;
  
  span {
    font-size: 24px;
    font-weight: 700;
    color: #ff7401;
    display: block;
    margin-top: 3px;
  }
  
  @media (max-width: 1024px) {
    text-align: left;
    margin-bottom: 0;
    
    span {
      display: inline;
      margin-left: 8px;
    }
  }
`;

export const BookButton = styled.button`
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  border: none;
  padding: 15px 35px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 116, 1, 0.3);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 116, 1, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:disabled {
    background: linear-gradient(90deg, #555, #777);
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 14px;
  }
`;

export const Tag = styled.span`
  background: rgba(255, 116, 1, 0.15);
  color: #ff7401;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Badge = styled.div`
  display: inline-block;
  background: ${props => props.type === 'adult' ? 'rgba(255, 116, 1, 0.15)' : 'rgba(132, 90, 223, 0.15)'};
  color: ${props => props.type === 'adult' ? '#ff7401' : '#845ADF'};
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 5px;
`;